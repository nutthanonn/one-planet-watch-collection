package routers

import (
	"github.com/gin-gonic/gin"
	handler "github.com/one-planet/cmd/infrastructure/handlers/request_handler"
	"github.com/one-planet/pkg/feature/request/presenter"
	"github.com/one-planet/pkg/feature/request/repository"
)

func (ar *appRouter) RequestRouter(api *gin.RouterGroup) {

	request_repository := repository.NewRequestRepository(ar.mongo_database, ar.redis_client)
	request_presenter := presenter.NewRequestPresenter()
	request_handler := handler.NewRequestHandler(ar.mongo_database, ar.redis_client, request_presenter, request_repository)

	api.POST("/request", request_handler.CreateRequest())
	api.POST("/request/accept/:req_id", request_handler.AcceptRequest())
	api.DELETE("/request/delete/:req_id", request_handler.DeleteRequest())

	api.GET("/request", request_handler.GetAllRequest())
	api.PATCH("/request/:req_id", request_handler.ReadMailRequest())
}
