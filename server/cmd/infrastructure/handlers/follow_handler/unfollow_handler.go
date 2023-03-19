package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	ur "github.com/one-planet/pkg/feature/user/repository"
	"github.com/one-planet/pkg/helper"
)

func (fh *followHandler) UnFollow() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		bearerToken, err := helper.BearerToken(ctx.GetHeader("Authorization"))
		user_repository := ur.NewUserRepository(fh.mongo_database, fh.redis_client)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, fh.presenter.FollowErrorResponse(err))
			return
		}

		following_name := ctx.Param("following_name")
		token, err := helper.VerifyToken(*bearerToken)

		if err != nil {
			ctx.JSON(http.StatusBadRequest, fh.presenter.FollowErrorResponse(err))
			return
		}

		following_id, err := user_repository.GetUserByUsername(following_name)

		if err != nil {
			ctx.JSON(http.StatusInternalServerError, fh.presenter.FollowErrorResponse(err))
			return
		}

		my_acc_id := token["sub"].(string)

		if err = fh.repository.UnFollow(my_acc_id, following_id.ID.Hex()); err != nil {
			ctx.JSON(http.StatusBadRequest, fh.presenter.FollowErrorResponse(err))
			return
		}

		ctx.JSON(http.StatusOK, fh.presenter.SeccessUnFollow())
	}
}
