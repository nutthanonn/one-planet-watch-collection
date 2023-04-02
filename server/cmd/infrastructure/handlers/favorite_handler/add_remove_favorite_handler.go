package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/one-planet/pkg/feature/user/repository"
	"github.com/one-planet/pkg/helper"
)

func (fh *favoriteHandler) AddRemoveFavoriteHandler() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		model_id := ctx.Param("model_id")
		user_repository := repository.NewUserRepository(fh.mongo_database, fh.redis_client)
		bearerToken, err := helper.BearerToken(ctx.GetHeader("Authorization"))

		if err != nil {
			ctx.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized", "error": err.Error()})
			return
		}

		token, err := helper.VerifyToken(*bearerToken)

		if err != nil {
			ctx.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized", "error": err.Error()})
			return
		}

		userID := token["sub"].(string)

		user, err := user_repository.GetUserById(userID)

		if err != nil || user == nil {
			ctx.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized", "error": err.Error()})
			return
		}

		err = fh.favorite_repository.AddFavorite(userID, model_id)

		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"message": nil, "error": err.Error()})
			return
		}

		ctx.JSON(http.StatusOK, gin.H{"message": "Success", "error": nil})
	}
}
