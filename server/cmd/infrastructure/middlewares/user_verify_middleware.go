package middlewares

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/one-planet/pkg/helper"
)

func respondWithError(c *gin.Context, code int, message interface{}) {
	c.AbortWithStatusJSON(code, gin.H{
		"status": "error",
		"error":  message,
	})
}

func UserVerifyMiddleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		bearerToken, err := helper.BearerToken(ctx.GetHeader("Authorization"))
		if err != nil {
			respondWithError(ctx, http.StatusUnauthorized, "Unauthorized")
			return
		}

		token, err := helper.VerifyToken(*bearerToken)
		if err != nil {
			respondWithError(ctx, http.StatusUnauthorized, "Unauthorized")
			return
		}

		if ok := token["verify"].(bool); !ok {
			respondWithError(ctx, http.StatusUnauthorized, "Unauthorized verify")
			return
		}

		ctx.Next()
	}
}
