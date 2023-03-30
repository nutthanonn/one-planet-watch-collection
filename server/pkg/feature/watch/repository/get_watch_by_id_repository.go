package repository

import (
	"context"
	"encoding/json"

	"github.com/one-planet/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (wr *watchRepository) GetWatchById(id string) (*models.Watches, error) {
	val, err := wr.redis_client.Get(id).Result()

	if err == nil {
		var watch_data *models.Watches
		json.Unmarshal([]byte(val), &watch_data)
		return watch_data, nil
	}

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

	json_res, err := json.Marshal(watch_data)
	if err != nil {
		return nil, err
	}

	if err := wr.redis_client.Set(watch_data.ID.Hex(), json_res, 0).Err(); err != nil {
		return nil, err
	}

	return &watch_data, nil
}
