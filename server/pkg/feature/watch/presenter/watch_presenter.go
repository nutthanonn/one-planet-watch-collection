package presenter

import (
	"github.com/gin-gonic/gin"
	"github.com/one-planet/pkg/models"
)

type watchPresenter struct {
}

type WatchPresenter interface {
	WatchesSuccessResponse(data []*models.Watches) gin.H
	WatchErrorResponse(err error) gin.H
}

func NewWatchPresenter() WatchPresenter {
	return &watchPresenter{}
}

func (wp *watchPresenter) WatchesSuccessResponse(data []*models.Watches) gin.H {

	return gin.H{
		"status": "success",
		"error":  nil,
		"data":   data,
	}
}

func (wp *watchPresenter) WatchErrorResponse(err error) gin.H {
	return gin.H{
		"status": "error",
		"error":  err.Error(),
		"data":   nil,
	}
}
