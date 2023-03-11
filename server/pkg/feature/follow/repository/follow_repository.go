package repository

import (
	"context"
	"errors"

	"github.com/go-redis/redis"
	"github.com/one-planet/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type followRepository struct {
	mongo_database *mongo.Database
	redis_client   *redis.Client
}

type FollowRepository interface {
	Follow(followerID string, followingID string) error
	UnFollow(followerID string, followingID string) error
}

func NewFollowRepository(mongo_database *mongo.Database, redis_client *redis.Client) FollowRepository {
	return &followRepository{
		mongo_database: mongo_database,
		redis_client:   redis_client,
	}
}

func (fr *followRepository) Follow(followerID string, followingID string) error {
	user_collection := fr.mongo_database.Collection("users")

	follower_objectID, err := primitive.ObjectIDFromHex(followerID)
	if err != nil {
		return err
	}

	following_objectID, err := primitive.ObjectIDFromHex(followingID)
	if err != nil {
		return err
	}

	follower_filter := bson.M{"_id": follower_objectID}
	following_filter := bson.M{"_id": following_objectID}

	var follower models.User
	if err := user_collection.FindOne(context.Background(), follower_filter).Decode(&follower); err != nil {
		return err
	}

	for _, following := range follower.Following {
		if following == following_objectID {
			return errors.New("already following")
		}
	}

	follower_update := bson.M{"$push": bson.M{"following": following_objectID}}
	following_update := bson.M{"$push": bson.M{"follower": follower_objectID}}

	session, err := fr.mongo_database.Client().StartSession()
	if err != nil {
		return err
	}
	defer session.EndSession(context.Background())

	err = session.StartTransaction()
	if err != nil {
		return err
	}

	if _, err = user_collection.UpdateOne(context.TODO(), follower_filter, follower_update); err != nil {
		session.AbortTransaction(context.Background())
		return err
	}

	if _, err = user_collection.UpdateOne(context.TODO(), following_filter, following_update); err != nil {
		session.AbortTransaction(context.Background())
		return err
	}

	if err = session.CommitTransaction(context.Background()); err != nil {
		return err
	}

	return nil
}
