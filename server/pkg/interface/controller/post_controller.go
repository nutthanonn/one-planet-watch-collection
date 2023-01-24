package controller

import (
	"github.com/nutthanonn/go-clean-architecture-nosql/pkg/domain/models"
	"github.com/nutthanonn/go-clean-architecture-nosql/pkg/usecase/interacter"
)

type postController struct {
	postInteractor interacter.PostInteractor
}

type PostController interface {
	GetPost() ([]*models.Post, error)
}

func NewPostController(pi interacter.PostInteractor) PostController {
	return &postController{
		postInteractor: pi,
	}
}

func (pc *postController) GetPost() ([]*models.Post, error) {
	return pc.postInteractor.GetPost()
}
