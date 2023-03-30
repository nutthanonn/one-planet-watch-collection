package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis"
	"github.com/one-planet/pkg/feature/favorite/repository"
	"go.mongodb.org/mongo-driver/mongo"
)

type favoriteHandler struct {
	mongo_database      *mongo.Database
	redis_client        *redis.Client
	favorite_repository repository.FavoriteRespository
}

type FavoriteHandler interface {
	AddRemoveFavoriteHandler() gin.HandlerFunc
}

func NewFavoriteHandler(mongo_database *mongo.Database, redis_client *redis.Client, favorite_repository repository.FavoriteRespository) FavoriteHandler {
	return &favoriteHandler{
		mongo_database:      mongo_database,
		redis_client:        redis_client,
		favorite_repository: favorite_repository,
	}
}
