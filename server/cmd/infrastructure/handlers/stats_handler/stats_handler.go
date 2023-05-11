package handler

import (
	"encoding/json"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis"
	"github.com/one-planet/pkg/feature/stats/presenter"
	"github.com/one-planet/pkg/feature/stats/repository"
	"github.com/one-planet/pkg/models"
	"go.mongodb.org/mongo-driver/mongo"
)

type statsHandler struct {
	mongo_database *mongo.Database
	redis_client   *redis.Client
	presenter      presenter.StatsPresenter
	repository     repository.StatsRepository
}

type StatsHandler interface {
	GetStats24Hours() gin.HandlerFunc
}

func NewStatsHandler(mongo_database *mongo.Database, redis_client *redis.Client, presenter presenter.StatsPresenter, repository repository.StatsRepository) StatsHandler {
	return &statsHandler{
		mongo_database: mongo_database,
		redis_client:   redis_client,
		presenter:      presenter,
		repository:     repository,
	}
}

func (sh *statsHandler) GetStats24Hours() gin.HandlerFunc {
	return func(c *gin.Context) {
		stats, err := sh.redis_client.Get("stats").Result()

		if err != nil {
			c.JSON(http.StatusInternalServerError, sh.presenter.ErrorResponse(err))
			return
		}

		stats_response := make([]*models.Stats, 0)

		err = json.Unmarshal([]byte(stats), &stats_response)

		if err != nil {
			c.JSON(http.StatusInternalServerError, sh.presenter.ErrorResponse(err))
		}

		c.JSON(http.StatusOK, sh.presenter.SuccessResponse(stats_response))
	}
}
