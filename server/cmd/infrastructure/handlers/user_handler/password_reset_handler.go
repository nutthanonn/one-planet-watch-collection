package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/one-planet/pkg/helper"
)

type passwordReset struct {
	Password string `json:"password"`
}

func (uh *userHandler) PasswordReset() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		bearerToken, err := helper.BearerToken(ctx.GetHeader("Authorization"))

		if err != nil {
			ctx.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			return
		}

		token, err := helper.VerifyToken(*bearerToken)

		if err != nil {
			ctx.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			return
		}

		tokenReset := token["sub"].(string)

		if tokenReset != "Password Reset" {
			ctx.JSON(http.StatusUnauthorized, gin.H{"error": "invalid token"})
		}

		var passwordReset passwordReset

		if err := ctx.ShouldBindJSON(&passwordReset); err != nil {
			ctx.JSON(http.StatusBadRequest, uh.presenter.UserErrorResponse(err))
			return
		}

		if err := uh.repository.PasswordReset(token["name"].(string), passwordReset.Password); err != nil {
			ctx.JSON(http.StatusBadRequest, uh.presenter.UserErrorResponse(err))
			return
		}

		ctx.JSON(http.StatusOK, gin.H{
			"status":  "success",
			"error":   false,
			"message": "Password has been reset",
			"data":    nil,
		})
	}
}
