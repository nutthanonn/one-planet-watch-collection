package handler

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/one-planet/pkg/helper"
)

func (rh *requestHandler) ReadMailRequest() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		bearerToken, err := helper.BearerToken(ctx.GetHeader("Authorization"))

		if err != nil {
			ctx.JSON(http.StatusUnauthorized, rh.presenter.RequestErrorResponse(errors.New("Unauthorized")))
			return
		}

		claims, err := helper.VerifyToken(*bearerToken)

		if err != nil {
			ctx.JSON(http.StatusUnauthorized, rh.presenter.RequestErrorResponse(errors.New("Unauthorized")))
			return
		}

		userId := claims["sub"].(string)
		reqId := ctx.Param("req_id")

		err = rh.repository.ReadMailRequest(reqId, userId)

		if err != nil {
			ctx.JSON(http.StatusInternalServerError, rh.presenter.RequestErrorResponse(err))
			return
		}

		ctx.JSON(http.StatusOK, rh.presenter.RequestSuccessResponse())
	}
}
