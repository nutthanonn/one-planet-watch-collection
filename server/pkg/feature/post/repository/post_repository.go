package repository

import (
	"github.com/go-redis/redis"
	"github.com/one-planet/pkg/models"
	"go.mongodb.org/mongo-driver/mongo"
)

type postRepository struct {
	mongo_database *mongo.Database
	redis_client   *redis.Client
}

type PostRepository interface {
	CreatePost(userID string, post *models.Post) error
	DeletePost(userID, postID string) error
}

func NewPostRepository(mongo_database *mongo.Database, redis_client *redis.Client) PostRepository {
	return &postRepository{
		mongo_database: mongo_database,
		redis_client:   redis_client,
	}
}
