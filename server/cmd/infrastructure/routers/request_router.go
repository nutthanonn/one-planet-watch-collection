package routers

import (
	"github.com/gin-gonic/gin"
	handler "github.com/one-planet/cmd/infrastructure/handlers/request_handler"
	"github.com/one-planet/pkg/feature/request/presenter"
	"github.com/one-planet/pkg/feature/request/repository"
)

func (ar *appRouter) RequestRouter(api *gin.RouterGroup) {
	// favorite_repository := repository.NewFavoriteRepository(ar.mongo_database, ar.redis_client)
	// favorite_handler := handler.NewFavoriteHandler(ar.mongo_database, ar.redis_client, favorite_repository)

	request_repository := repository.NewRequestRepository(ar.mongo_database, ar.redis_client)
	request_presenter := presenter.NewRequestPresenter()
	request_handler := handler.NewRequestHandler(ar.mongo_database, ar.redis_client, request_presenter, request_repository)

	api.POST("/request", request_handler.CreateRequest())
	api.DELETE("/request/:req_id", request_handler.CreateRequest())

	api.GET("/request", request_handler.GetAllRequest())
	api.PATCH("/request/:req_id", request_handler.ReadMailRequest())
}
