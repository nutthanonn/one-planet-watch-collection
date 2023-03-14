package repository

import (
	"context"

	"github.com/go-redis/redis"
	"github.com/one-planet/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type searchRepository struct {
	mongo_database *mongo.Database
	redis_client   *redis.Client
}

type SearchRepository interface {
	SearchModel(search_key string) ([]*models.Watches, error)
	SearchUser(search_key string) ([]*models.User, error)
	SearchAll(search_key string) ([]*models.Watches, []*models.User, error)
}

func NewSearchRepository(mongo_database *mongo.Database, redis_client *redis.Client) SearchRepository {
	return &searchRepository{
		mongo_database: mongo_database,
		redis_client:   redis_client,
	}
}

func (sr *searchRepository) SearchModel(search_key string) ([]*models.Watches, error) {
	watch_collection := sr.mongo_database.Collection("watches")

	filter := bson.M{"model": bson.M{"$regex": search_key, "$options": "i"}}

	var watches []*models.Watches
	cursor, err := watch_collection.Find(context.TODO(), filter)
	if err != nil {
		return nil, err
	}

	if err = cursor.All(context.TODO(), &watches); err != nil {
		return nil, err
	}

	return watches, nil
}

func (sr *searchRepository) SearchUser(search_key string) ([]*models.User, error) {
	user_collection := sr.mongo_database.Collection("users")

	filter := bson.M{"username": bson.M{"$regex": search_key, "$options": "i"}}

	var users []*models.User
	cursor, err := user_collection.Find(context.TODO(), filter)
	if err != nil {
		return nil, err
	}

	if err = cursor.All(context.TODO(), &users); err != nil {
		return nil, err
	}

	return users, nil
}

func (sr *searchRepository) SearchAll(search_key string) ([]*models.Watches, []*models.User, error) {

	watches, err := sr.SearchModel(search_key)
	if err != nil {
		return nil, nil, err
	}

	users, err := sr.SearchUser(search_key)
	if err != nil {
		return nil, nil, err
	}

	return watches, users, nil
}
