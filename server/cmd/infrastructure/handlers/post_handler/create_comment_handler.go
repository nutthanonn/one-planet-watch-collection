package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/one-planet/pkg/models"
)

func (ph *postHandler) CreateComment() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var comment *models.Comment
		post_id := ctx.Param("post_id")
		user_id := ctx.Param("user_id")

		if err := ctx.ShouldBindJSON(&comment); err != nil {
			ctx.JSON(http.StatusBadRequest, ph.presenter.PostErrorResponse(err))
			return
		}

		if err := ph.repository.CreateComment(user_id, post_id, comment); err != nil {
			ctx.JSON(http.StatusInternalServerError, ph.presenter.PostErrorResponse(err))
			return
		}

		ctx.JSON(http.StatusOK, ph.presenter.SuccessResponse())
	}
}
