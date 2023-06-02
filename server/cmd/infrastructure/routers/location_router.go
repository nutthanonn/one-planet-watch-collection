package routers

import (
	"github.com/gin-gonic/gin"
	handler "github.com/one-planet/cmd/infrastructure/handlers/location_handler"
)

func (ar *appRouter) LocationRouter(api *gin.RouterGroup) {
	locationHandler := handler.NewLocationHandler()

	api.POST("/location", locationHandler.GetLocationData())
}
