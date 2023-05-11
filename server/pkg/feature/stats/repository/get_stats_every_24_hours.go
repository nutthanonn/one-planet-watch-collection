package repository

import (
	"context"
	"time"

	"github.com/one-planet/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
)

func (sr *statsRepository) GetStatsEvery24Hours() ([]*models.Stats, error) {
	watch_log_collection := sr.mongo_database.Collection("watch_log")
	watch_collection := sr.mongo_database.Collection("watch")
	current_date := time.Now().UTC()

	top_fav, err := watch_collection.Aggregate(context.TODO(), []bson.M{
		{
			"$sort": bson.M{
				"fav_count": -1,
			},
		},
		{
			"$limit": 10,
		},
	})

	if err != nil {
		return nil, err
	}

	var top_fav_result []*models.Watches

	for top_fav.Next(context.Background()) {
		var result models.Watches
		if err := top_fav.Decode(&result); err != nil {
			return nil, err
		}
		top_fav_result = append(top_fav_result, &result)
	}

	stats := []*models.Stats{}

	for _, watch := range top_fav_result {
		var stats_result models.Stats

		log_filter := bson.M{
			"watch_id": watch.ID,
			"created_at": bson.M{
				"$gte": current_date.AddDate(0, 0, -1),
				"$lt":  current_date,
			},
		}

		count, err := watch_log_collection.CountDocuments(context.Background(), log_filter)
		if err != nil {
			return nil, err
		}

		stats_result.Watch = *watch
		stats_result.Percentage = (float64(count) / float64(watch.Favorite)) * 100
	}

	// set stats to redis
	if err := sr.redis_client.Set("stats", stats, 0).Err(); err != nil {
		return nil, err
	}

	return stats, nil
}
