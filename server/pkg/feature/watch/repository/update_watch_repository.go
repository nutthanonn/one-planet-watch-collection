package repository

import (
	"context"
	"errors"

	"github.com/one-planet/pkg/feature/user/repository"
	"github.com/one-planet/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (wr *watchRepository) UpdateWatch(user_id, watch_id string, data models.Watches) error {
	watch_collection := wr.mongo_database.Collection("watches")
	user_repository := repository.NewUserRepository(wr.mongo_database, wr.redis_client)

	user, err := user_repository.GetUserById(user_id)

	if err != nil {
		return err
	}

	if user.Role != "admin" {
		return errors.New("you are not authorized to update this watch")
	}

	objectID, err := primitive.ObjectIDFromHex(watch_id)

	if err != nil {
		return err
	}

	if data.Image == "" || data.Name == "" || data.Description == "" {
		return errors.New("all fields are required")
	}

	filter := bson.M{"_id": objectID}
	update := bson.M{"$set": data}

	_, err = watch_collection.UpdateOne(context.TODO(), filter, update)

	if err != nil {
		return err
	}

	return nil
}
