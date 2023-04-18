package repository

import (
	"context"
	"errors"

	"github.com/one-planet/pkg/feature/user/repository"
	"github.com/one-planet/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
)

func (rr *requestRepository) GetAllRequest(user_id string) ([]*models.RequestModel, error) {
	collection := rr.mongo_database.Collection("request_watch")
	user_collection := repository.NewUserRepository(rr.mongo_database, rr.redis_client)

	user, err := user_collection.GetUserById(user_id)

	if err != nil {
		return nil, err
	}

	if user.Role != "admin" {
		return nil, errors.New("you are not admin")
	}

	var result []*models.RequestModel

	cursor, err := collection.Find(context.TODO(), bson.M{})

	if err != nil {
		return nil, err
	}

	for cursor.Next(context.Background()) {
		var request models.RequestModel
		err := cursor.Decode(&request)

		if err != nil {
			return nil, err
		}

		result = append(result, &request)
	}

	return result, nil
}
