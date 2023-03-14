package routers

import (
	"github.com/gin-gonic/gin"
	handler "github.com/one-planet/cmd/infrastructure/handlers/search_handler"
	"github.com/one-planet/pkg/feature/search/presenter"
	"github.com/one-planet/pkg/feature/search/repository"
)

func (ar *appRouter) SearchRouter(api *gin.RouterGroup) {
	search_presenter := presenter.NewSearchPresenter()
	search_repository := repository.NewSearchRepository(ar.mongo_database, ar.redis_client)
	search_handler := handler.NewSearchHandler(ar.mongo_database, ar.redis_client, search_presenter, search_repository)

	api.GET("/search/user", search_handler.SearchUser())
}
