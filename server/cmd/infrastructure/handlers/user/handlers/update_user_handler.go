package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/one-planet/pkg/helper"
	"github.com/one-planet/pkg/models"
)

func (uh *userHandler) UpdateUser() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var updateUser *models.User

		bearerToken, err := helper.BearerToken(ctx.GetHeader("Authorization"))

		if err != nil {
			ctx.JSON(http.StatusInternalServerError, uh.presenter.UserErrorResponse(err))
			return
		}

		if err := ctx.ShouldBindJSON(&updateUser); err != nil {
			ctx.JSON(http.StatusBadRequest, uh.presenter.UserErrorResponse(err))
			return
		}

		if err = uh.repository.UpdateUser(bearerToken, updateUser); err != nil {
			ctx.JSON(http.StatusInternalServerError, uh.presenter.UserErrorResponse(err))
			return
		}

		ctx.JSON(http.StatusOK, uh.presenter.UpdateUserSeccessResponse(updateUser))
	}
}
