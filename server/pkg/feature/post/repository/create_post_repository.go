package repository

import (
	"context"
	"errors"
	"time"

	"github.com/one-planet/pkg/helper"
	"github.com/one-planet/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (pr *postRepository) CreatePost(userID string, post *models.Post) error {
	user_collection := pr.mongo_database.Collection("users")
	post.CreateAt = time.Now()

	userObjectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return err
	}

	for _, v := range post.Images {
		if !helper.RegexCheckFormatImage(v) {
			return errors.New("invalid image format")
		}
	}

	if len(post.Images) > 10 {
		return errors.New("maximum 10 images")
	}

	post.ID = primitive.NewObjectID()
	filter := bson.M{"_id": userObjectID}
	update := bson.M{"$push": bson.M{"posts": bson.M{"$each": []models.Post{*post}, "$position": 0}}}

	res, err := user_collection.UpdateOne(context.TODO(), filter, update)

	if err != nil {
		return err
	}

	if res.MatchedCount == 0 {
		return errors.New("user not found")
	}

	return nil
}
