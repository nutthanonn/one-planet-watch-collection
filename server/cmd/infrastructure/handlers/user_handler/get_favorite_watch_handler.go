package handlers

import (
	"github.com/gin-gonic/gin"
	"github.com/one-planet/pkg/feature/watch/repository"
	"github.com/one-planet/pkg/models"
)

type FavoriteList struct {
	WatchID []string `json:"watch_id"`
}

func (uh *userHandler) GetFavoriteWatch() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var favoriteList FavoriteList

		if err := ctx.ShouldBindJSON(&favoriteList); err != nil {
			ctx.JSON(400, gin.H{
				"message": "Bad request",
			})
			return
		}

		watchRepository := repository.NewWatchRepository(uh.mongo_database, uh.redis_client)

		var watchModel []*models.Watches

		for _, v := range favoriteList.WatchID {
			watch, err := watchRepository.GetWatchById(v)
			if err != nil {
				ctx.JSON(400, gin.H{
					"message": "Bad request",
				})
				return
			}

			watchModel = append(watchModel, watch)
		}

		// Return favorite list
		ctx.JSON(200, gin.H{
			"favorite_list": watchModel,
		})
	}
}
