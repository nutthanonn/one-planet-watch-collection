package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/one-planet/pkg/helper"
)

type jwtHandler struct {
}

type JWTHandler interface {
	JWTVerify() gin.HandlerFunc
}

func NewJWTHandler() JWTHandler {
	return &jwtHandler{}
}

func (jh *jwtHandler) JWTVerify() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		bearer, err := helper.BearerToken(ctx.GetHeader("Authorization"))
		if err != nil {
			ctx.JSON(401, gin.H{"error": err.Error()})
			return
		}

		claims, err := helper.VerifyToken(*bearer)

		if err != nil {
			ctx.JSON(401, gin.H{"error": err.Error()})
			return
		}

		ctx.JSON(200, gin.H{"claims": claims})
	}
}
