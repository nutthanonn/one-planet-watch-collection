package routers

import (
	"github.com/gin-gonic/gin"
	handler "github.com/one-planet/cmd/infrastructure/handlers/favorite_handler"
	"github.com/one-planet/pkg/feature/favorite/repository"
)

func (ar *appRouter) FavoriteRouter(api *gin.RouterGroup) {
	favorite_repository := repository.NewFavoriteRepository(ar.mongo_database, ar.redis_client)
	favorite_handler := handler.NewFavoriteHandler(ar.mongo_database, ar.redis_client, favorite_repository)

	api.POST("/favorite/:model_id", favorite_handler.AddRemoveFavoriteHandler())
}
