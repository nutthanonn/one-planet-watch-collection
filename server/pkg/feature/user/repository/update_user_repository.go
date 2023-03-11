package repository

import (
	"context"
	"errors"
	"time"

	"github.com/one-planet/pkg/helper"
	"github.com/one-planet/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func (ur *userRepository) UpdateUser(bearerToken *string, updateData *models.User) error {
	user_collection := ur.mongo_database.Collection("users")
	verify_token, err := helper.VerifyToken(*bearerToken)

	if updateData.Password == "" {
		return errors.New("password is required")
	}

	if ok := helper.ValidateBase64(updateData.Image); !ok {
		return errors.New("image is not base64")
	}

	if err != nil {
		return err
	}

	user_id := verify_token["sub"].(string)

	oldData, err := ur.GetUserById(user_id)

	if err != nil {
		return err
	}

	if !helper.Compare(updateData.Password, oldData.Password) {
		return errors.New("password is not match")
	}

	objectID, err := primitive.ObjectIDFromHex(user_id)
	if err != nil {
		return err
	}

	updateData.UpdatedAt = time.Now()
	updateData.Password = oldData.Password
	filter := bson.M{"_id": objectID}
	update := bson.M{"$set": updateData}

	_, err = user_collection.UpdateOne(context.TODO(), filter, update)

	if err != nil {
		if err == mongo.ErrNoDocuments {
			return errors.New("user not found")
		}
		return err
	}

	if err := ur.redis_client.Del(user_id).Err(); err != nil {
		return err
	}

	return nil
}
