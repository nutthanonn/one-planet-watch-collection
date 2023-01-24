package repository

import "github.com/nutthanonn/go-clean-architecture-nosql/pkg/domain/models"

type PostRepository interface {
	GetPost() ([]*models.Post, error)
}
