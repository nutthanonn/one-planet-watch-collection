package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis"
	"github.com/one-planet/pkg/feature/watch/presenter"
	"github.com/one-planet/pkg/feature/watch/repository"
	"go.mongodb.org/mongo-driver/mongo"
)

type watchHandler struct {
	mongo_database *mongo.Database
	redis_client   *redis.Client
	repository     repository.WatchRepository
	presenter      presenter.WatchPresenter
}

type WatchHandler interface {
	GetAllWatch() gin.HandlerFunc
	GetWatchById() gin.HandlerFunc
}

func NewWatchHandler(mongo_database *mongo.Database, redis_client *redis.Client, repository repository.WatchRepository, presenter presenter.WatchPresenter) WatchHandler {
	return &watchHandler{
		mongo_database: mongo_database,
		redis_client:   redis_client,
		repository:     repository,
		presenter:      presenter,
	}
}
