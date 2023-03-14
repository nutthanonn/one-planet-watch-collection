package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis"
	"github.com/one-planet/pkg/feature/search/presenter"
	"github.com/one-planet/pkg/feature/search/repository"
	"go.mongodb.org/mongo-driver/mongo"
)

type searchHandler struct {
	mongo_database *mongo.Database
	redis_client   *redis.Client
	presenter      presenter.SearchPresenter
	repository     repository.SearchRepository
}

type SearchHandler interface {
	SearchUser() gin.HandlerFunc
}

func NewSearchHandler(mongo_database *mongo.Database, redis_client *redis.Client, presenter presenter.SearchPresenter, repository repository.SearchRepository) SearchHandler {
	return &searchHandler{
		mongo_database: mongo_database,
		redis_client:   redis_client,
		presenter:      presenter,
		repository:     repository,
	}
}

func (sh *searchHandler) SearchUser() gin.HandlerFunc {
	return func(ctx *gin.Context) {

		searchKey := ctx.Query("q")

		searchUser, err := sh.repository.SearchUser(searchKey)

		if err != nil {
			ctx.JSON(http.StatusInternalServerError, sh.presenter.SearchErrorResponse(err))
		}

		ctx.JSON(http.StatusOK, sh.presenter.SearchSuccessResponse(searchUser))
	}
}
