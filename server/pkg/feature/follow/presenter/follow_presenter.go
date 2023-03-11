package presenter

import "github.com/gin-gonic/gin"

type followPresenter struct {
}

type FollowPresenter interface {
	SeccessFollow() gin.H
	SeccessUnFollow() gin.H
	FollowErrorResponse(err error) gin.H
}

func NewFollowPresenter() FollowPresenter {
	return &followPresenter{}
}

func (fp *followPresenter) SeccessFollow() gin.H {
	return gin.H{
		"status":  "success",
		"error":   false,
		"message": "Follow successful",
	}
}

func (fp *followPresenter) SeccessUnFollow() gin.H {
	return gin.H{
		"status":  "success",
		"error":   false,
		"message": "Unfollow successful",
	}
}

func (fp *followPresenter) FollowErrorResponse(err error) gin.H {
	return gin.H{
		"status":  "failed",
		"error":   true,
		"message": err.Error(),
	}
}
