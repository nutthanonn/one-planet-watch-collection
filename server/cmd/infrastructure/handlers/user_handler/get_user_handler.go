package handlers

import (
	"errors"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

func (uh *userHandler) GetUser() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		username := ctx.Param("username")
		username = strings.ToLower(username)

		user, err := uh.repository.GetUserByUsername(username)

		if err != nil {
			ctx.JSON(http.StatusInternalServerError, uh.presenter.UserErrorResponse(err))
			return
		}

		if user == nil {
			ctx.JSON(http.StatusNotFound, uh.presenter.UserErrorResponse(errors.New("user not found")))
			return
		}
		ctx.JSON(http.StatusOK, uh.presenter.UserSeccessResponse(user))
	}
}
