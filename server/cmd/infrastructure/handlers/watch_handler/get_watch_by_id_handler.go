package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (wh *watchHandler) GetWatchById() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		id := ctx.Param("id")

		watch, err := wh.repository.GetWatchById(id)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, wh.presenter.WatchErrorResponse(err))
			return
		}

		ctx.JSON(http.StatusOK, wh.presenter.WatchSuccessResponse(watch))
	}
}
