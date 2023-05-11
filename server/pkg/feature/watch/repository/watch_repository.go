package repository

import (
	"github.com/go-redis/redis"
	"github.com/one-planet/pkg/models"
	"go.mongodb.org/mongo-driver/mongo"
)

type watchRepository struct {
	mongo_database *mongo.Database
	redis_client   *redis.Client
}

type WatchRepository interface {
	GetAllWatch() ([]*models.Watches, error)
	GetWatchById(id string) (*models.Watches, error)
	GetWatchByBrand(brand string) ([]*models.Watches, error)
	DeleteWatchByID(watchID, userID string) error
	CreateWatch(userId string, watchModel *models.Watches) error
	UpdateWatch(user_id, watch_id string, data models.Watches) error
}

func NewWatchRepository(mongo_database *mongo.Database, redis_client *redis.Client) WatchRepository {
	return &watchRepository{
		mongo_database: mongo_database,
		redis_client:   redis_client,
	}
}
