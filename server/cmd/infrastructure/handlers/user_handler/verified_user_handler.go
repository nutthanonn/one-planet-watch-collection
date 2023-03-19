package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/one-planet/pkg/helper"
)

func (uh *userHandler) VerifiedUser() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		token := ctx.Param("token")

		claims, err := helper.VerifyToken(token)

		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		sub := claims["sub"].(string)

		err = uh.repository.VerifiedUser(sub)

		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		ctx.Redirect(http.StatusMovedPermanently, helper.GetENV("CLIENT_BASE_URL")+"/login")

		ctx.JSON(http.StatusMovedPermanently, gin.H{"message": "User verified successfully"})
	}
}
