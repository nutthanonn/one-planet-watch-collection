package repository

import (
	"context"

	"github.com/nutthanonn/go-clean-architecture-nosql/pkg/domain/models"
	"github.com/nutthanonn/go-clean-architecture-nosql/pkg/usecase/repository"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type postRepository struct {
	db *mongo.Database
}

func NewPostRepository(db *mongo.Database) repository.PostRepository {
	return &postRepository{db}
}

func (pr *postRepository) GetPost() ([]*models.Post, error) {
	var post []*models.Post

	cur, err := pr.db.Collection("post").Find(context.TODO(), bson.D{})

	if err != nil {
		return nil, err
	}

	for cur.Next(context.TODO()) {
		var p models.Post
		err := cur.Decode(&p)
		if err != nil {
			return nil, err
		}
		post = append(post, &p)
	}

	return post, nil
}
