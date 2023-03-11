package repository

import (
	"context"
	"encoding/json"

	"github.com/one-planet/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (ur *userRepository) GetUserById(ID string) (*models.User, error) {
	val, err := ur.redis_client.Get(ID).Result()

	if err == nil {
		var res *models.User
		json.Unmarshal([]byte(val), &res)
		return res, nil
	}

	user_collection := ur.mongo_database.Collection("users")

	objectID, err := primitive.ObjectIDFromHex(ID)
	if err != nil {
		return nil, err
	}

	filter := bson.M{"_id": objectID}
	var user models.User
	if err := user_collection.FindOne(context.TODO(), filter).Decode(&user); err != nil {
		return nil, err
	}

	json_res, err := json.Marshal(user)
	if err != nil {
		return nil, err
	}

	if err := ur.redis_client.Set(user.ID.Hex(), json_res, 0).Err(); err != nil {
		return nil, err
	}

	return &user, nil
}
