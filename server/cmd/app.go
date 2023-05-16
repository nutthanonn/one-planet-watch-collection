package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/one-planet/cmd/config"
	"github.com/one-planet/cmd/infrastructure/connection"
	"github.com/one-planet/cmd/infrastructure/routers"
	"github.com/one-planet/pkg/feature/stats/repository"
)

func main() {
	mongo_client := connection.MongoConnection()
	redis_client := connection.RedisConnection()

	defer func() {
		mongo_client.Disconnect(context.TODO())
		redis_client.Close()
	}()

	pong, err := redis_client.Ping().Result()
	if err != nil {
		log.Fatal(err)
		return
	}

	fmt.Println(pong)

	app := gin.New()
	app.Use(config.NewCors())
	mongo_database := mongo_client.Database("one-planet")
	app_router := routers.NewAppRouter(mongo_database, redis_client)

	api := app.Group("/api")
	{
		app_router.UserRouter(api)
		app_router.WatchRouter(api)
		app_router.SearchRouter(api)
		app_router.StatsRouter(api)

		// token required (bearer token)
		app_router.JWTRouter(api)

		// verify account required and bearer token required
		app_router.FollowRouter(api)
		app_router.PostRouter(api)
		app_router.FavoriteRouter(api)
		app_router.RequestRouter(api)
	}

	go func() {
		for {
			// Query data here
			stats_repository := repository.NewStatsRepository(mongo_database, redis_client)
			stats_repository.GetStatsEvery24Hours()

			// Wait for 24 hours before querying data again
			time.Sleep(24 * time.Hour)
		}
	}()

	app.Run(":8080")
}
