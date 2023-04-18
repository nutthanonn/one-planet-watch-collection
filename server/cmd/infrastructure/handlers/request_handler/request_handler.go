package handler

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis"
	"github.com/one-planet/pkg/feature/request/presenter"
	"github.com/one-planet/pkg/feature/request/repository"
	"github.com/one-planet/pkg/helper"
	"github.com/one-planet/pkg/models"
	"go.mongodb.org/mongo-driver/mongo"
)

type requestHandler struct {
	mongo_database *mongo.Database
	redis_client   *redis.Client
	presenter      presenter.RequestPresenter
	repository     repository.RequestRepository
}

type RequestHandler interface {
	CreateRequest() gin.HandlerFunc
	DeleteRequest() gin.HandlerFunc
	GetAllRequest() gin.HandlerFunc
	ReadMailRequest() gin.HandlerFunc
}

func NewRequestHandler(mongo_database *mongo.Database, redis_client *redis.Client, presenter presenter.RequestPresenter, repository repository.RequestRepository) RequestHandler {
	return &requestHandler{
		mongo_database: mongo_database,
		redis_client:   redis_client,
		presenter:      presenter,
		repository:     repository,
	}
}

func (ch *requestHandler) CreateRequest() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var model models.RequestModel

		bearerToken, err := helper.BearerToken(ctx.GetHeader("Authorization"))

		if err != nil {
			ctx.JSON(http.StatusUnauthorized, ch.presenter.RequestErrorResponse(errors.New("Unauthorized")))
			return
		}

		claims, err := helper.VerifyToken(*bearerToken)

		if err != nil {
			ctx.JSON(http.StatusUnauthorized, ch.presenter.RequestErrorResponse(errors.New("token error")))
			return
		}

		userId := claims["sub"].(string)

		if err := ctx.ShouldBindJSON(&model); err != nil {
			ctx.JSON(http.StatusBadRequest, ch.presenter.RequestErrorResponse(err))
			return
		}

		if err := ch.repository.CreateRequest(&model, userId); err != nil {
			ctx.JSON(http.StatusBadRequest, ch.presenter.RequestErrorResponse(err))
			return
		}

		ctx.JSON(http.StatusOK, ch.presenter.RequestSuccessResponse())
	}
}

func (ch *requestHandler) DeleteRequest() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		req_id := ctx.Param("req_id")

		bearerToken, err := helper.BearerToken("Authorization")

		if err != nil {
			ctx.JSON(http.StatusUnauthorized, ch.presenter.RequestErrorResponse(errors.New("Unauthorized")))
			return
		}

		claims, err := helper.VerifyToken(*bearerToken)

		if err != nil {
			ctx.JSON(http.StatusUnauthorized, ch.presenter.RequestErrorResponse(errors.New("Unauthorized")))
			return
		}

		userId := claims["sub"].(string)

		if err := ch.repository.DeleteRequest(req_id, userId); err != nil {
			ctx.JSON(http.StatusBadRequest, ch.presenter.RequestErrorResponse(err))
			return
		}

		ctx.JSON(http.StatusOK, ch.presenter.RequestSuccessResponse())
	}
}
