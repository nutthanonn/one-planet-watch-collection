package presenter

import (
	"github.com/gin-gonic/gin"
	"github.com/one-planet/pkg/models"
)

type requestPresenter struct {
}

type RequestPresenter interface {
	RequestSuccessResponse() gin.H
	RequestErrorResponse(err error) gin.H
	RequestAllSuccessResponse(data []*models.RequestModel) gin.H
}

func NewRequestPresenter() RequestPresenter {
	return &requestPresenter{}
}

func (rp *requestPresenter) RequestSuccessResponse() gin.H {
	return gin.H{
		"error":   nil,
		"message": "success",
	}
}

func (rp *requestPresenter) RequestErrorResponse(err error) gin.H {
	return gin.H{
		"error":   err.Error(),
		"message": "failed",
	}
}

func (rp *requestPresenter) RequestAllSuccessResponse(data []*models.RequestModel) gin.H {
	return gin.H{
		"error":   nil,
		"message": "success",
		"data":    data,
	}
}
