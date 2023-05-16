package repository

import (
	"context"
	"encoding/json"
	"reflect"
	"time"

	"github.com/one-planet/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func (sr *statsRepository) GetStatsEvery24Hours() ([]*models.Stats, error) {
	watch_log_collection := sr.mongo_database.Collection("watch_log")
	watch_collection := sr.mongo_database.Collection("watches")
	current_date := time.Now().UTC()

	findOptions := options.Find()
	findOptions.SetSort(bson.M{
		"favorite": -1,
	})
	findOptions.SetLimit(10)

	cursor, err := watch_collection.Find(context.TODO(), bson.D{}, findOptions)
	if err != nil {
		return nil, err
	}

	var top_favorite_today_result []*models.Watches

	for cursor.Next(context.TODO()) {
		var watch_data models.Watches
		if err := cursor.Decode(&watch_data); err != nil {
			return nil, err
		}
		top_favorite_today_result = append(top_favorite_today_result, &watch_data)
	}

	stats := make([]*models.Stats, 0)

	for _, v := range top_favorite_today_result {
		id := v.ID.Hex()

		filter := bson.M{
			"watches_id": id,
			"created_at": bson.M{
				"$gte": current_date.AddDate(0, 0, -1),
			},
		}

		count, err := watch_log_collection.Find(context.Background(), filter)

		if err != nil {
			return nil, err
		}

		change := 0
		for count.Next(context.Background()) {
			var watch_log models.Watch_Log
			if err := count.Decode(&watch_log); err != nil {
				return nil, err
			}

			if watch_log.Favorite {
				change++
			} else {
				change--
			}
		}

		percent_change := float64(v.Favorite+change) / float64(v.Favorite) * 100

		if reflect.DeepEqual(v.Favorite, 0) {
			percent_change = 0
		}

		if percent_change < 0 {
			percent_change = percent_change * -1
		}

		// append to stats
		stats = append(stats, &models.Stats{
			Watch:      *v,
			Percentage: percent_change,
		})
	}

	marshal, err := json.Marshal(stats)

	if err != nil {
		return nil, err
	}

	if err := sr.redis_client.Set("stats", marshal, 0).Err(); err != nil {
		return nil, err
	}

	return stats, nil
}
