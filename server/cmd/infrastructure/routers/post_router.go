package routers

import (
	"github.com/gin-gonic/gin"

	handler "github.com/one-planet/cmd/infrastructure/handlers/post_handler"
	"github.com/one-planet/pkg/feature/post/presenter"
	"github.com/one-planet/pkg/feature/post/repository"
)

func (ar *appRouter) PostRouter(api *gin.RouterGroup) {
	post_presenter := presenter.NewPostPresenter()
	post_repository := repository.NewPostRepository(ar.mongo_database, ar.redis_client)
	post_handler := handler.NewPostHandler(ar.mongo_database, ar.redis_client, post_presenter, post_repository)

	api.POST("/user/post", post_handler.CreatePost())
	api.POST("/user/post/:post_id/:user_id/comment", post_handler.CreateComment())
	api.DELETE("/user/post/:id", post_handler.DeletePost())

}
