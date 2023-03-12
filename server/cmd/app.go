package main

import (
	"context"
	"fmt"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/one-planet/cmd/infrastructure/connection"
	"github.com/one-planet/cmd/infrastructure/routers"
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
	mongo_database := mongo_client.Database("one-planet")

	app_router := routers.NewAppRouter(mongo_database, redis_client)

	api := app.Group("/api")
	{
		app_router.UserRouter(api)
		app_router.WatchRouter(api)

		// autherize required
		app_router.FollowRouter(api)
	}

	app.Run(":8080")
}
