package presenter

import (
	"github.com/gofiber/fiber/v2"
	"github.com/nutthanonn/go-clean-architecture-nosql/pkg/domain/models"
)

type PostPresenter interface {
	PostSeccessResponse(model []*models.Post) *fiber.Map
	PostErrorResponse(err error) *fiber.Map
}
