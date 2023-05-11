package presenter

import (
	"github.com/gin-gonic/gin"
	"github.com/one-planet/pkg/models"
)

type statsPresenter struct {
}

type StatsPresenter interface {
	SuccessResponse(stats []*models.Stats) gin.H
	ErrorResponse(err error) gin.H
}

func NewStatsPresenter() StatsPresenter {
	return &statsPresenter{}
}

func (sp *statsPresenter) SuccessResponse(stats []*models.Stats) gin.H {
	return gin.H{
		"status": "success",
		"data":   stats,
	}
}

func (sp *statsPresenter) ErrorResponse(err error) gin.H {
	return gin.H{
		"status":  "error",
		"message": err.Error(),
	}
}
