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

func (ur *userRepository) UpdateUser(bearerToken *string, updateData *models.User) (*string, error) {
	user_collection := ur.mongo_database.Collection("users")
	verify_token, err := helper.VerifyToken(*bearerToken)

	if updateData.Password == "" {
		return nil, errors.New("password is required")
	}
	if ok := helper.ValidateUsername(updateData.Username); !ok {
		return nil, errors.New("username is not allowed")
	}

	if ok := helper.ValidateBase64(updateData.Avatar); !ok && updateData.Avatar != "" {
		return nil, errors.New("image is not base64")
	}

	if ok := helper.ValidateBase64(updateData.BackgroundProfile); !ok && updateData.BackgroundProfile != "" {
		return nil, errors.New("image is not base64")
	}

	if err != nil {
		return nil, err
	}

	user_id := verify_token["sub"].(string)

	oldData, err := ur.GetUserById(user_id)

	if err != nil {
		return nil, err
	}

	if !helper.Compare(updateData.Password, oldData.Password) {
		return nil, errors.New("password is not match")
	}

	objectID, err := primitive.ObjectIDFromHex(user_id)
	if err != nil {
		return nil, err
	}

	updateData.UpdatedAt = time.Now()

	updateData.Password = oldData.Password
	updateData.Role = oldData.Role
	updateData.Follower = oldData.Follower
	updateData.Following = oldData.Following
	updateData.CreateAt = oldData.CreateAt
	updateData.Verified = oldData.Verified
	updateData.MemberShip = oldData.MemberShip
	updateData.Posts = oldData.Posts
	updateData.Favorite_List = oldData.Favorite_List

	filter := bson.M{"_id": objectID}
	update := bson.M{"$set": updateData}

	_, err = user_collection.UpdateOne(context.TODO(), filter, update)

	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, errors.New("user not found")
		}
		return nil, err
	}

	if err := ur.redis_client.Del(user_id).Err(); err != nil {
		return nil, err
	}

	token, err := helper.GenerateToken(5*24*time.Hour, user_id, updateData.Email, updateData.Username, updateData.Verified)

	if err != nil {
		return nil, err
	}

	return &token, nil
}
