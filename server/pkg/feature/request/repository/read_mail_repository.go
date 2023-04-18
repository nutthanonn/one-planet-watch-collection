package repository

import (
	"context"
	"errors"

	"github.com/one-planet/pkg/feature/user/repository"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (rr *requestRepository) ReadMailRequest(req_id, user_id string) error {
	collection := rr.mongo_database.Collection("request_watch")
	user_collection := repository.NewUserRepository(rr.mongo_database, rr.redis_client)

	user, err := user_collection.GetUserById(user_id)

	if err != nil {
		return err
	}

	if user.Role != "admin" {
		return errors.New("you are not admin")
	}

	objReqId, err := primitive.ObjectIDFromHex(req_id)

	if err != nil {
		return err
	}

	filter := bson.M{"_id": objReqId}

	update := bson.M{
		"$set": bson.M{
			"read": true,
		},
	}

	_, err = collection.UpdateOne(context.TODO(), filter, update)

	if err != nil {
		return err
	}

	return nil
}
