package repository

import (
	"context"
	"errors"
	"time"

	"github.com/one-planet/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (pr *postRepository) CreateComment(userID, postID string, comment *models.Comment) error {
	user_ObjectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return err
	}

	user_collection := pr.mongo_database.Collection("users")

	var user *models.User
	filter := bson.M{"_id": user_ObjectID}
	if err := user_collection.FindOne(context.TODO(), filter).Decode(&user); err != nil {
		return err
	}

	if user == nil {
		return errors.New("user does not exist")
	}

	comment.CreateAt = time.Now()
	comment.ID = primitive.NewObjectID()

	for index, post := range user.Posts {
		if post.ID.Hex() == postID {
			user.Posts[index].Comments = append(user.Posts[index].Comments, *comment)
		}
	}

	update := bson.M{"$set": bson.M{"posts": user.Posts}}
	if _, err := user_collection.UpdateOne(context.TODO(), filter, update); err != nil {
		return err
	}

	if err := pr.redis_client.Del(userID).Err(); err != nil {
		return err
	}

	return nil
}
