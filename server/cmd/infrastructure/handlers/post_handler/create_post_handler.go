package handler

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/one-planet/pkg/helper"
	"github.com/one-planet/pkg/models"
)

func (ph *postHandler) CreatePost() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var postModel *models.Post
		bearerToken, err := helper.BearerToken(ctx.GetHeader("Authorization"))

		if err != nil {
			ctx.JSON(http.StatusUnauthorized, ph.presenter.PostErrorResponse(errors.New("Unauthorized")))
			return
		}

		claims, err := helper.VerifyToken(*bearerToken)

		if err != nil {
			ctx.JSON(http.StatusUnauthorized, ph.presenter.PostErrorResponse(errors.New("Unauthorized")))
			return
		}

		userId := claims["sub"].(string)

		if userId == "" {
			ctx.JSON(http.StatusUnauthorized, ph.presenter.PostErrorResponse(errors.New("Unauthorized")))
			return
		}

		if err := ctx.ShouldBindJSON(&postModel); err != nil {
			ctx.JSON(http.StatusBadRequest, ph.presenter.PostErrorResponse(err))
			return
		}

		if err := ph.repository.CreatePost(userId, postModel); err != nil {
			ctx.JSON(http.StatusBadRequest, ph.presenter.PostErrorResponse(err))
			return
		}

		ctx.JSON(http.StatusOK, ph.presenter.SuccessResponse())
	}
}
