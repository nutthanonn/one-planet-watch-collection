package repository

import (
	"github.com/go-redis/redis"
	"go.mongodb.org/mongo-driver/mongo"
)

type favoriteRespository struct {
	mongo_database *mongo.Database
	redis_client   *redis.Client
}

type FavoriteRespository interface {
	AddFavorite(userID string, ModelID string) error
}

func NewFavoriteRepository(mongo_database *mongo.Database, redis_client *redis.Client) FavoriteRespository {
	return &favoriteRespository{
		mongo_database: mongo_database,
		redis_client:   redis_client,
	}
}
