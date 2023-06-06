package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/one-planet/pkg/helper"
)

func (uh *userHandler) SendMail() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		bearerToken, err := helper.BearerToken(ctx.GetHeader("Authorization"))

		if err != nil {
			ctx.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			return
		}

		token, err := helper.VerifyToken(*bearerToken)

		email := token["email"].(string)

		if err != nil {
			ctx.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			return
		}

		link := helper.GetENV("SERVER_BASE_URL") + "/api/users/verify/" + *bearerToken
		helper.SendMail("Welcome To ONE PLANET Website", "You're receiving this email because you recently created a new account. If this wasn't you, please ignore this email.", email, link)

		ctx.JSON(http.StatusOK, gin.H{"message": "Email sent"})
	}
}
