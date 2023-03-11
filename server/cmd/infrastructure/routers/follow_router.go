package routers

import (
	"github.com/gin-gonic/gin"
	handlers "github.com/one-planet/cmd/infrastructure/handlers/follow_handler"
	"github.com/one-planet/cmd/infrastructure/middlewares"
	"github.com/one-planet/pkg/feature/follow/presenter"
	"github.com/one-planet/pkg/feature/follow/repository"
)

func (er *appRouter) FollowRouter(api *gin.RouterGroup) {
	follow_repository := repository.NewFollowRepository(er.mongo_database, er.redis_client)
	follow_presenter := presenter.NewFollowPresenter()

	follow_handler := handlers.NewFollowHandler(er.mongo_database, er.redis_client, follow_presenter, follow_repository)

	api.Use(middlewares.UserVerifyMiddleware())
	api.GET("/follow/:following_name", follow_handler.Follow())
	api.GET("/unfollow/:following_name", follow_handler.UnFollow())
}
