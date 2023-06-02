package repository

import (
	"context"

	"github.com/one-planet/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
)

func (wr *watchRepository) GetWatchByBrand(brand string) ([]*models.Watches, error) {
	watch_collection := wr.mongo_database.Collection("watches")

	var compare = map[string]string{
		"rolex":             "ROLEX",
		"patek-philippe":    "PATEK PHILIPPE",
		"richard-mille":     "RICHARD MILLE",
		"daniel-wellington": "DANIEL WELLINGTON",
	}

	brand = compare[brand]

	var watch_data []*models.Watches
	filter := bson.M{"brand": brand}

	cursor, err := watch_collection.Find(context.Background(), filter)

	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.Background())

	for cursor.Next(context.Background()) {
		var watch models.Watches
		if err := cursor.Decode(&watch); err != nil {
			return nil, err
		}
		watch_data = append(watch_data, &watch)
	}

	return watch_data, nil
}
