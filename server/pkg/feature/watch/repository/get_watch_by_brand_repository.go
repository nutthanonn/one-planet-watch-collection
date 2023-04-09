package repository

import (
	"context"

	"github.com/one-planet/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
)

func (wr *watchRepository) GetWatchByBrand(brand string) ([]*models.Watches, error) {
	watch_collection := wr.mongo_database.Collection("watches")

	var watch_data []*models.Watches

	filter := bson.M{"brand": brand}

	if err := watch_collection.FindOne(context.Background(), filter).Decode(&watch_data); err != nil {
		return nil, err
	}

	return watch_data, nil
}
