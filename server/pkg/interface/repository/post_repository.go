package repository

import (
	"context"

	"github.com/nutthanonn/web-programming-server/pkg/domain/models"
	"github.com/nutthanonn/web-programming-server/pkg/usecase/repository"
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
	postCollection := pr.db.Collection("post")

	cur, err := postCollection.Find(context.Background(), bson.D{{}})

	if err != nil {
		return nil, err
	}

	for cur.Next(context.Background()) {
		var p models.Post
		err := cur.Decode(&p)
		if err != nil {
			return nil, err
		}
		post = append(post, &p)
	}

	return post, nil
}
