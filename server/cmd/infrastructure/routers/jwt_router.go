package routers

import (
	"github.com/gin-gonic/gin"
	handler "github.com/one-planet/cmd/infrastructure/handlers/jwt_handler"
	"github.com/one-planet/cmd/infrastructure/middlewares"
)

func (ar *appRouter) JWTRouter(api *gin.RouterGroup) {
	jwt := handler.NewJWTHandler()

	api.Use(middlewares.TokenMiddleware())
	api.GET("/token/verify", jwt.JWTVerify())
}
