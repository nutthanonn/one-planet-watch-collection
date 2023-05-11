package routers

import (
	"github.com/gin-gonic/gin"
	handlers "github.com/one-planet/cmd/infrastructure/handlers/watch_handler"
	"github.com/one-planet/pkg/feature/watch/presenter"
	"github.com/one-planet/pkg/feature/watch/repository"
)

func (ar *appRouter) WatchRouter(api *gin.RouterGroup) {
	watch_repository := repository.NewWatchRepository(ar.mongo_database, ar.redis_client)
	watch_presenter := presenter.NewWatchPresenter()
	watch_handler := handlers.NewWatchHandler(ar.mongo_database, ar.redis_client, watch_repository, watch_presenter)

	api.GET("/watches", watch_handler.GetAllWatch()) // ?q=20 or not
	api.GET("/watches/:id", watch_handler.GetWatchById())
	api.GET("/watches/brand", watch_handler.GetWatchByBrand()) // ?brand=...

	api.PUT("/watches/:id", watch_handler.UpdateWatch()) // only admin can update
	api.DELETE("/watches/:watchID", watch_handler.DeleteWatchById())

}
