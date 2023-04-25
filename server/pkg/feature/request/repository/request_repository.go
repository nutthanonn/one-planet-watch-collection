package repository

import (
	"context"
	"errors"

	"github.com/go-redis/redis"
	"github.com/one-planet/pkg/feature/user/repository"
	"github.com/one-planet/pkg/helper"
	"github.com/one-planet/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type requestRepository struct {
	mongo_database *mongo.Database
	redis_client   *redis.Client
}

type RequestRepository interface {
	CreateRequest(data *models.RequestModel, user_id string) error
	DeleteRequest(req_id, user_id string) error
	GetAllRequest(user_id string) ([]*models.RequestModel, error)
	ReadMailRequest(req_id, user_id string) error
	AcceptRequest(user_id, req_id string) error
}

func NewRequestRepository(mongo_database *mongo.Database, redis_client *redis.Client) RequestRepository {
	return &requestRepository{
		mongo_database: mongo_database,
		redis_client:   redis_client,
	}
}

func (sr *requestRepository) CreateRequest(data *models.RequestModel, user_id string) error {
	collection := sr.mongo_database.Collection("request_watch")

	user_objId, err := primitive.ObjectIDFromHex(user_id)

	if !helper.ValidateBase64(data.Image) {
		return errors.New("image is not base64")
	}

	if err != nil {
		return err
	}

	data.Read = false

	data.User_id = user_objId
	_, err = collection.InsertOne(context.TODO(), data)

	if err != nil {
		return err
	}

	return nil
}

func (sr *requestRepository) DeleteRequest(req_id, user_id string) error {
	collection := sr.mongo_database.Collection("request_watch")
	user_collection := repository.NewUserRepository(sr.mongo_database, sr.redis_client)

	user, err := user_collection.GetUserById(user_id)

	if err != nil {
		return err
	}

	if user.Role != "admin" {
		return errors.New("you are not admin")
	}

	objReqId, err := primitive.ObjectIDFromHex(req_id)

	if err != nil {
		return err
	}

	filter := bson.M{"_id": objReqId}

	_, err = collection.DeleteOne(context.Background(), filter)

	if err != nil {
		return err
	}

	return nil
}
