package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (wh *watchHandler) GetAllWatch() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		watches, err := wh.repository.GetAllWatch()
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, wh.presenter.WatchErrorResponse(err))
			return
		}

		ctx.JSON(http.StatusOK, wh.presenter.WatchesSuccessResponse(watches))
	}
}
