package presenter

import (
	"github.com/gin-gonic/gin"
	"github.com/one-planet/pkg/models"
)

type watchPresenter struct {
}

type WatchPresenter interface {
	WatchesSuccessResponse(data []*models.Watches) gin.H
	WatchSuccessResponse(data *models.Watches) gin.H
	WatchErrorResponse(err error) gin.H
}

func NewWatchPresenter() WatchPresenter {
	return &watchPresenter{}
}

func (wp *watchPresenter) WatchesSuccessResponse(data []*models.Watches) gin.H {

	var watchResponse []*models.WatchResponse

	for _, v := range data {
		check := true
		for _, k := range watchResponse {
			if v.Brand == k.Brand {
				check = false
				if len(k.Model) < 20 {
					k.Model = append(k.Model, v)
					break
				}
			}
		}

		if check {
			watchResponse = append(watchResponse, &models.WatchResponse{
				Brand: v.Brand,
				Model: []*models.Watches{v},
			})
		}
	}

	return gin.H{
		"status": "success",
		"error":  nil,
		"data":   watchResponse,
	}
}

func (wp *watchPresenter) WatchErrorResponse(err error) gin.H {
	return gin.H{
		"status": "error",
		"error":  err.Error(),
		"data":   nil,
	}
}

func (wp *watchPresenter) WatchSuccessResponse(data *models.Watches) gin.H {
	return gin.H{
		"status": "success",
		"error":  nil,
		"data":   data,
	}
}
