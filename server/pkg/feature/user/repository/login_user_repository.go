package repository

import (
	"context"
	"errors"
	"time"

	"github.com/one-planet/pkg/helper"
	"github.com/one-planet/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
)

func (ur *userRepository) LoginUser(user *models.UserLogin) (*string, error) {
	user_collection := ur.mongo_database.Collection("users")
	var userDB *models.User

	filter := bson.M{"email": user.Email}
	if err := user_collection.FindOne(context.TODO(), filter).Decode(&userDB); err != nil {
		return nil, err
	}

	if ok := helper.Compare(user.Password, userDB.Password); !ok {
		return nil, errors.New("password is not match")
	}

	token, err := helper.GenerateToken(5*24*time.Hour, userDB.ID.Hex(), userDB.Email, userDB.Username)

	if err != nil {
		return nil, err
	}

	return &token, nil
}
