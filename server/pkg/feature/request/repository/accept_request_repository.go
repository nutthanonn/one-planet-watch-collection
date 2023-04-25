package repository

import (
	"context"

	"github.com/one-planet/pkg/feature/watch/repository"
	"github.com/one-planet/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (rr *requestRepository) AcceptRequest(user_id, req_id string) error {
	obj_req_id, err := primitive.ObjectIDFromHex(req_id)

	if err != nil {
		return err
	}

	collection := rr.mongo_database.Collection("request_watch")
	filter := bson.M{"_id": obj_req_id}

	var request models.RequestModel

	err = collection.FindOne(context.TODO(), filter).Decode(&request)

	if err != nil {
		return err
	}

	err = collection.FindOneAndDelete(context.TODO(), filter).Decode(&request)

	if err != nil {
		return err
	}

	var watchModel = &models.Watches{
		Brand:       request.Brand,
		Name:        request.Name,
		Image:       request.Image,
		Description: request.Description,
		Favorite:    0,
	}

	watch_repository := repository.NewWatchRepository(rr.mongo_database, rr.redis_client)
	err = watch_repository.CreateWatch(user_id, watchModel)

	if err != nil {
		return err
	}

	return nil
}
