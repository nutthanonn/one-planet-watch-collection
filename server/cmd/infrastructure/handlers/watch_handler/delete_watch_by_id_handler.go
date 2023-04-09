package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/one-planet/pkg/helper"
)

func (wh *watchHandler) DeleteWatchById() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		watchID := ctx.Param("watchID")

		bearerToken, err := helper.BearerToken(ctx.GetHeader("Authorization"))

		if err != nil {
			ctx.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			return
		}

		token, err := helper.VerifyToken(*bearerToken)

		if err != nil {
			ctx.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			return
		}

		userID := token["sub"].(string)

		err = wh.repository.DeleteWatchByID(watchID, userID)

		if err != nil {
			ctx.JSON(500, gin.H{
				"error":   err.Error(),
				"message": "watch not deleted",
			})
			return
		}

		ctx.JSON(http.StatusOK, gin.H{
			"message": "watch deleted",
		})
	}
}
