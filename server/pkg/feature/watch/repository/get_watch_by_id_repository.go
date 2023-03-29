package repository

import (
	"context"

	"github.com/one-planet/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (wr *watchRepository) GetWatchById(id string) (*models.Watches, error) {
	watch_collection := wr.mongo_database.Collection("watches")

	var watch_data models.Watches

	object_id, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		return nil, err
	}

	filter := bson.M{"_id": object_id}

	if err := watch_collection.FindOne(context.Background(), filter).Decode(&watch_data); err != nil {
		return nil, err
	}

	return &watch_data, nil
}
