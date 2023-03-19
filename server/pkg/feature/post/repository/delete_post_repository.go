package repository

import (
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (pr *postRepository) DeletePost(userID, postID string) error {
	user_collection := pr.mongo_database.Collection("users")

	userObjectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return err
	}

	postObjectID, err := primitive.ObjectIDFromHex(postID)
	if err != nil {
		return err
	}

	filter := bson.M{"_id": userObjectID}
	update := bson.M{"$pull": bson.M{"posts": bson.M{"id": postObjectID}}}

	if _, err := user_collection.UpdateOne(context.TODO(), filter, update); err != nil {
		return err
	}

	return nil
}
