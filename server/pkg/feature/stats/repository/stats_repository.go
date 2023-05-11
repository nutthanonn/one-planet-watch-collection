package repository

import (
	"github.com/go-redis/redis"
	"github.com/one-planet/pkg/models"
	"go.mongodb.org/mongo-driver/mongo"
)

type statsRepository struct {
	mongo_database *mongo.Database
	redis_client   *redis.Client
}

type StatsRepository interface {
	GetStatsEvery24Hours() ([]*models.Stats, error)
}

func NewStatsRepository(mongo_database *mongo.Database, redis_client *redis.Client) StatsRepository {
	return &statsRepository{
		mongo_database: mongo_database,
		redis_client:   redis_client,
	}
}
