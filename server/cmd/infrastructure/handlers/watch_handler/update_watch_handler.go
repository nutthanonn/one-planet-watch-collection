package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/one-planet/pkg/helper"
	"github.com/one-planet/pkg/models"
)

func (wh *watchHandler) UpdateWatch() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		watch_id := ctx.Param("id")
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

		var data models.Watches

		if err := ctx.ShouldBindJSON(&data); err != nil {
			ctx.JSON(http.StatusBadRequest, wh.presenter.WatchErrorResponse(err))
			return
		}

		if err := wh.repository.UpdateWatch(userID, watch_id, data); err != nil {
			ctx.JSON(http.StatusBadRequest, wh.presenter.WatchErrorResponse(err))
			return
		}

		ctx.JSON(http.StatusOK, wh.presenter.WatchSuccessResponse(&data))
	}
}
