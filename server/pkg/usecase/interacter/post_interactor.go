package interacter

import (
	"github.com/nutthanonn/go-clean-architecture-nosql/pkg/domain/models"
	"github.com/nutthanonn/go-clean-architecture-nosql/pkg/usecase/presenter"
	"github.com/nutthanonn/go-clean-architecture-nosql/pkg/usecase/repository"
)

type postInteractor struct {
	postRepository repository.PostRepository
	postPresenter  presenter.PostPresenter
}

type PostInteractor interface {
	GetPost() ([]*models.Post, error)
}

func NewPostInteractor(pr repository.PostRepository, pp presenter.PostPresenter) PostInteractor {
	return &postInteractor{
		postRepository: pr,
		postPresenter:  pp,
	}
}

func (pi *postInteractor) GetPost() ([]*models.Post, error) {
	post, err := pi.postRepository.GetPost()
	if err != nil {
		return nil, err
	}

	return post, nil
}
