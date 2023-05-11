package routers

import (
	"github.com/gin-gonic/gin"
	handler "github.com/one-planet/cmd/infrastructure/handlers/stats_handler"
	"github.com/one-planet/pkg/feature/stats/presenter"
	"github.com/one-planet/pkg/feature/stats/repository"
)

func (ar *appRouter) StatsRouter(api *gin.RouterGroup) {
	stats_presenter := presenter.NewStatsPresenter()
	stats_repository := repository.NewStatsRepository(ar.mongo_database, ar.redis_client)
	stats_handler := handler.NewStatsHandler(ar.mongo_database, ar.redis_client, stats_presenter, stats_repository)

	api.GET("/stats", stats_handler.GetStats24Hours())
}
