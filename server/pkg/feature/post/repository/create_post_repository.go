package repository

import (
	"context"
	"errors"

	"github.com/one-planet/pkg/helper"
	"github.com/one-planet/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (pr *postRepository) CreatePost(userID string, post *models.Post) error {
	user_collection := pr.mongo_database.Collection("users")

	userObjectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return err
	}

	if post.Images == nil {
		return errors.New("images is required")
	}

	if len(post.Images) > 10 {
		return errors.New("maximum 10 images")
	}

	for _, image := range post.Images {
		if !helper.ValidateBase64(image) {
			return errors.New("invalid image format")
		}
	}

	post.ID = primitive.NewObjectID()
	filter := bson.M{"_id": userObjectID}
	update := bson.M{"$push": bson.M{"posts": post}}

	if _, err := user_collection.UpdateOne(context.TODO(), filter, update); err != nil {
		return err
	}

	return nil
}
