package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (wh *watchHandler) GetWatchByBrand() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		query := ctx.Query("brand")

		watch, err := wh.repository.GetWatchByBrand(query)

		if err != nil {
			ctx.JSON(http.StatusInternalServerError, wh.presenter.WatchErrorResponse(err))
			return
		}

		ctx.JSON(http.StatusOK, wh.presenter.BrandWatchSuccessResponse(watch))
	}
}
