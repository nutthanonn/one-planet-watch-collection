package repository

import "github.com/nutthanonn/web-programming-server/pkg/domain/models"

type PostRepository interface {
	GetPost() ([]*models.Post, error)
}
