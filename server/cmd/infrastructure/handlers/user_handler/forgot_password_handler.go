package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type forgotPassword struct {
	Username string `json:"username"`
}

func (uh *userHandler) ForgotPassword() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var forgotPassword forgotPassword

		if err := ctx.ShouldBindJSON(&forgotPassword); err != nil {
			ctx.JSON(http.StatusBadRequest, uh.presenter.UserErrorResponse(err))
			return
		}

		if err := uh.repository.ForgotPassword(forgotPassword.Username); err != nil {
			ctx.JSON(http.StatusBadRequest, uh.presenter.UserErrorResponse(err))
			return
		}

		ctx.JSON(http.StatusOK, gin.H{
			"status":  "success",
			"error":   false,
			"message": "Reset password link has been sent to your email",
			"data":    nil,
		})
	}
}
