package repository

import (
	"context"

	"github.com/one-planet/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
)

func (ur *userRepository) GetUserByUsername(username string) (*models.User, error) {
	user_collection := ur.mongo_database.Collection("users")

	filter := bson.M{"username": username}
	var user models.User
	if err := user_collection.FindOne(context.TODO(), filter).Decode(&user); err != nil {
		return nil, err
	}

	return &user, nil
}
