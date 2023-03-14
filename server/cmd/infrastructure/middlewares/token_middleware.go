package middlewares

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/one-planet/pkg/helper"
)

func TokenMiddleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		bearerToken, err := helper.BearerToken(ctx.GetHeader("Authorization"))
		if err != nil {
			respondWithError(ctx, http.StatusUnauthorized, "Unauthorized")
			return
		}

		if bearerToken == nil {
			respondWithError(ctx, http.StatusUnauthorized, "Unauthorized")
			return
		}

		ctx.Next()
	}
}
