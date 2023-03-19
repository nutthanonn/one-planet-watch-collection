package handler

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/one-planet/pkg/helper"
)

func (ph *postHandler) DeletePost() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		bearerToken, err := helper.BearerToken(ctx.GetHeader("Authorization"))
		postID := ctx.Param("id")

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

		if err := ph.repository.DeletePost(userId, postID); err != nil {
			ctx.JSON(http.StatusBadRequest, ph.presenter.PostErrorResponse(err))
			return
		}

		ctx.JSON(http.StatusOK, ph.presenter.SuccessResponse())
	}
}
