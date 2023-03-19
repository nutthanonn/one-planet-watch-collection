package presenter

import "github.com/gin-gonic/gin"

type postPresenter struct {
}

type PostPresenter interface {
	SuccessResponse() gin.H
	PostErrorResponse(err error) gin.H
}

func NewPostPresenter() PostPresenter {
	return &postPresenter{}
}

func (pp *postPresenter) SuccessResponse() gin.H {
	return gin.H{
		"status": "success",
		"error":  nil,
	}
}

func (pp *postPresenter) PostErrorResponse(err error) gin.H {
	return gin.H{
		"status": "error",
		"error":  err.Error(),
	}
}
