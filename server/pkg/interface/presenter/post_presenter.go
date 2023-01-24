package presenter

import (
	"github.com/gofiber/fiber/v2"
	"github.com/nutthanonn/go-clean-architecture-nosql/pkg/domain/models"
	"github.com/nutthanonn/go-clean-architecture-nosql/pkg/usecase/presenter"
)

type postPresenter struct {
}

func NewPostPresenter() presenter.PostPresenter {
	return &postPresenter{}
}

func (pp *postPresenter) PostSeccessResponse(post []*models.Post) *fiber.Map {
	var postResponse []*models.Post

	for _, p := range post {
		postResponse = append(postResponse, &models.Post{
			ID:          p.ID,
			Title:       p.Title,
			Description: p.Description,
		})
	}

	return &fiber.Map{
		"status":  true,
		"message": "Post successfully retrieved",
		"data":    postResponse,
		"error":   nil,
	}
}

func (pp *postPresenter) PostErrorResponse(err error) *fiber.Map {
	return &fiber.Map{
		"status":  false,
		"message": "Post failed to retrieve",
		"data":    nil,
		"error":   err.Error(),
	}
}
