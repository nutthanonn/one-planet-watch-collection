package handlers

import (
	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis"
	"github.com/one-planet/pkg/feature/user/presenter"
	"github.com/one-planet/pkg/feature/user/repository"
	"go.mongodb.org/mongo-driver/mongo"
)

type userHandler struct {
	mongo_database *mongo.Database
	redis_client   *redis.Client
	presenter      presenter.UserPresenter
	repository     repository.UserRepository
}

type UserHandler interface {
	CreateUser() gin.HandlerFunc
	VerifiedUser() gin.HandlerFunc
	UpdateUser() gin.HandlerFunc
	GetUser() gin.HandlerFunc
	LoginUser() gin.HandlerFunc
	SendMail() gin.HandlerFunc
	GetFavoriteWatch() gin.HandlerFunc
	GetRoleHandler() gin.HandlerFunc
	PasswordReset() gin.HandlerFunc
	ForgotPassword() gin.HandlerFunc
}

func NewUserHandler(mongo_database *mongo.Database, redis_client *redis.Client, presenter presenter.UserPresenter, repository repository.UserRepository) UserHandler {
	return &userHandler{
		mongo_database: mongo_database,
		redis_client:   redis_client,
		presenter:      presenter,
		repository:     repository,
	}
}
