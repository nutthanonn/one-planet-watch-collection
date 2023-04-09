package repository

import (
	"context"
	"errors"

	"github.com/one-planet/pkg/feature/user/repository"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (wr *watchRepository) DeleteWatchByID(watchID, userID string) error {
	collection := wr.mongo_database.Collection("watches")
	user_repository := repository.NewUserRepository(wr.mongo_database, wr.redis_client)

	user, err := user_repository.GetUserById(userID)

	if err != nil {
		return err
	}

	if user.Role != "admin" {
		return errors.New("you are not allowed to delete this watch")
	}

	objectWatchID, err := primitive.ObjectIDFromHex(watchID)

	if err != nil {
		return err
	}

	filter := bson.M{"_id": objectWatchID}
	if _, err = collection.DeleteOne(context.TODO(), filter); err != nil {
		return err
	}

	return nil
}
