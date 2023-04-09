package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (wh *watchHandler) GetAllWatch() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		q := ctx.Query("q")
		watches, err := wh.repository.GetAllWatch()
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, wh.presenter.WatchErrorResponse(err))
			return
		}

		if q == "20" {
			ctx.JSON(http.StatusOK, wh.presenter.WatchesSuccessResponse(watches))
			return
		}

		ctx.JSON(http.StatusOK, gin.H{
			"status": "success",
			"error":  nil,
			"data":   watches,
		})
	}
}
