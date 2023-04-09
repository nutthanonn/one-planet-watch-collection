package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/one-planet/pkg/helper"
)

func (uh *userHandler) GetRoleHandler() gin.HandlerFunc {
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

		userId := token["sub"].(string)

		user, err := uh.repository.GetUserById(userId)

		if err != nil {
			ctx.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			return
		}

		if user == nil {
			ctx.JSON(http.StatusUnauthorized, gin.H{"error": "User not found"})
			return
		}

		if user.Role == "admin" {
			ctx.JSON(http.StatusOK, gin.H{"role": "admin"})
			return
		}

		ctx.Redirect(http.StatusTemporaryRedirect, helper.GetENV("CLIENT_BASE_URL"))

		ctx.JSON(http.StatusOK, gin.H{"role": "user"})
	}
}
