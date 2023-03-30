package repository

import (
	"context"
	"errors"
	"time"

	"github.com/one-planet/pkg/feature/watch/repository"
	"github.com/one-planet/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func (fr *favoriteRespository) AddFavorite(userID string, ModelID string) error {
	watch_repository := repository.NewWatchRepository(fr.mongo_database, fr.redis_client)
	user_objectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return err
	}

	model_objectID, err := primitive.ObjectIDFromHex(ModelID)
	if err != nil {
		return err
	}

	isModelExist, err := watch_repository.GetWatchById(ModelID)

	if err != nil {
		return err
	}

	if isModelExist == nil {
		return errors.New("model not found")
	}

	user_collection := fr.mongo_database.Collection("users")
	watch_collection := fr.mongo_database.Collection("watches")
	watch_log_collection := fr.mongo_database.Collection("watch_logs")

	user_filter := bson.M{"_id": user_objectID}
	isFavorite, err := user_collection.FindOne(context.Background(), bson.M{"_id": user_objectID, "favorite_list": model_objectID}).DecodeBytes()

	if err != nil && err != mongo.ErrNoDocuments {
		return err
	}

	if isFavorite != nil {
		user_update := bson.M{"$pull": bson.M{"favorite_list": model_objectID}}
		_, err = user_collection.UpdateOne(context.Background(), user_filter, user_update)

		if err != nil {
			return err
		}

		watch_log := models.Watch_Log{
			Watch_id: model_objectID,
			User_id:  user_objectID,
			Favorite: false,
			CreateAt: time.Now(),
		}

		_, err = watch_log_collection.InsertOne(context.Background(), watch_log)

		if err != nil {
			return err
		}

		watch_filter := bson.M{"_id": model_objectID}
		watch_update := bson.M{"$inc": bson.M{"favorite": -1}}
		_, err = watch_collection.UpdateOne(context.Background(), watch_filter, watch_update)

		if err != nil {
			return err
		}
	} else {
		user_update := bson.M{"$addToSet": bson.M{"favorite_list": model_objectID}}
		_, err = user_collection.UpdateOne(context.Background(), user_filter, user_update)

		if err != nil {
			return err
		}

		watch_log := models.Watch_Log{
			Watch_id: model_objectID,
			User_id:  user_objectID,
			Favorite: true,
			CreateAt: time.Now(),
		}

		_, err = watch_log_collection.InsertOne(context.Background(), watch_log)

		if err != nil {
			return err
		}

		watch_filter := bson.M{"_id": model_objectID}
		watch_update := bson.M{"$inc": bson.M{"favorite": 1}}
		_, err = watch_collection.UpdateOne(context.Background(), watch_filter, watch_update)

		if err != nil {
			return err
		}
	}

	return nil
}
