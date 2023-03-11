package repository

import (
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (ur *userRepository) VerifiedUser(ID string) error {
	user_collection := ur.mongo_database.Collection("users")

	objectID, err := primitive.ObjectIDFromHex(ID)
	if err != nil {
		return err
	}

	filter := bson.M{"_id": objectID}
	update := bson.M{"$set": bson.M{"verified": true}}

	if _, err := user_collection.UpdateOne(context.TODO(), filter, update); err != nil {
		return err
	}

	return nil
}
