package routers

import (
	"github.com/gin-gonic/gin"
	handlers "github.com/one-planet/cmd/infrastructure/handlers/user_handler"
	"github.com/one-planet/pkg/feature/user/presenter"
	"github.com/one-planet/pkg/feature/user/repository"
)

func (ar *appRouter) UserRouter(api *gin.RouterGroup) {
	user_presenter := presenter.NewUserPresenneter()
	user_repository := repository.NewUserRepository(ar.mongo_database, ar.redis_client)
	user_handler := handlers.NewUserHandler(ar.mongo_database, ar.redis_client, user_presenter, user_repository)

	api.GET("/users/profile/:username", user_handler.GetUser())
	api.GET("/users/verify/:token", user_handler.VerifiedUser())
	api.GET("/users/sendmail", user_handler.SendMail())

	api.PUT("/users/update", user_handler.UpdateUser())

	api.POST("/users/register", user_handler.CreateUser())
	api.POST("/users/login", user_handler.LoginUser())
}