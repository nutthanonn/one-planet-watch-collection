package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/one-planet/pkg/helper"
	"github.com/one-planet/pkg/models"
	"github.com/rubenv/opencagedata"
)

type locationHandler struct {
}

type LocationHandler interface {
	GetLocationData() gin.HandlerFunc
}

func NewLocationHandler() LocationHandler {
	return &locationHandler{}
}

func (lh *locationHandler) GetLocationData() gin.HandlerFunc {
	return func(ctx *gin.Context) {

		var location models.RequestLocationModel

		if err := ctx.ShouldBindJSON(&location); err != nil {
			ctx.JSON(400, gin.H{
				"message": err.Error(),
			})

			return
		}

		geocoder := opencagedata.NewGeocoder(helper.GetENV("OPEN_CAGE_API_KEY"))

		result, err := geocoder.Geocode(location.Location, nil)

		if err != nil {
			ctx.JSON(500, gin.H{
				"message": err.Error(),
			})
		}

		ctx.JSON(200, gin.H{
			"message": result,
		})
	}
}
