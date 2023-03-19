package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis"
	"github.com/one-planet/pkg/feature/post/presenter"
	"github.com/one-planet/pkg/feature/post/repository"
	"go.mongodb.org/mongo-driver/mongo"
)

type postHandler struct {
	mongo_database *mongo.Database
	redis_client   *redis.Client
	presenter      presenter.PostPresenter
	repository     repository.PostRepository
}

type PostHandler interface {
	CreatePost() gin.HandlerFunc
	DeletePost() gin.HandlerFunc
}

func NewPostHandler(mongo_database *mongo.Database, redis_client *redis.Client, presenter presenter.PostPresenter, repository repository.PostRepository) PostHandler {
	return &postHandler{
		mongo_database: mongo_database,
		redis_client:   redis_client,
		presenter:      presenter,
		repository:     repository,
	}
}
