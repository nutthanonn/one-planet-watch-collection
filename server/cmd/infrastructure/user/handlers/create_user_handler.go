package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/one-planet/pkg/models"
)

func (uh *userHandler) CreateUser() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var user *models.User

		if err := ctx.ShouldBindJSON(&user); err != nil {
			ctx.JSON(http.StatusBadRequest, uh.presenter.UserErrorResponse(err))
			return
		}

		token, err := uh.repository.CreateUser(user)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, uh.presenter.UserErrorResponse(err))
			return
		}

		ctx.JSON(http.StatusOK, uh.presenter.CreateUserSuccessResponse(token))
	}
}
