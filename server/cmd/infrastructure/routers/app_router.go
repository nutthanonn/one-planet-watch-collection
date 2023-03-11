package routers

import (
	"github.com/go-redis/redis"
	"go.mongodb.org/mongo-driver/mongo"
)

type appRouter struct {
	mongo_database *mongo.Database
	redis_client   *redis.Client
}

func NewAppRouter(mongo_database *mongo.Database, redis_client *redis.Client) appRouter {
	app_router := appRouter{
		mongo_database: mongo_database,
		redis_client:   redis_client,
	}

	return app_router
}
