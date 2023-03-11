package handlers

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/one-planet/pkg/models"
	"go.mongodb.org/mongo-driver/mongo"
)

func (uh *userHandler) LoginUser() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var user *models.UserLogin

		if err := ctx.ShouldBindJSON(&user); err != nil {
			ctx.JSON(http.StatusBadRequest, uh.presenter.UserErrorResponse(err))
			return
		}

		token, err := uh.repository.LoginUser(user)

		if err != nil {
			if err == mongo.ErrNoDocuments {
				ctx.JSON(http.StatusNotFound, uh.presenter.UserErrorResponse(errors.New("user not found")))
				return
			}
			ctx.JSON(http.StatusInternalServerError, uh.presenter.UserErrorResponse(err))
			return
		}

		ctx.JSON(http.StatusOK, uh.presenter.UserLoginResponse(token))
	}
}
