package repository

import (
	"context"
	"errors"
	"time"

	"github.com/one-planet/pkg/helper"
	"github.com/one-planet/pkg/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (ur *userRepository) CreateUser(user *models.User) (*string, error) {
	user_collection := ur.mongo_database.Collection("users")

	if user.Password == "" {
		return nil, errors.New("password is required")
	}

	if user.Email == "" {
		return nil, errors.New("email is required")
	}

	if user.Username == "" {
		return nil, errors.New("username is required")
	}

	if _, err := ur.GetUserByUsername(user.Username); err == nil {
		return nil, errors.New("username already exists")
	}

	password_hasing, err := helper.Hashing(user.Password)
	if err != nil {
		return nil, err
	}

	user.CreateAt = time.Now()
	user.UpdatedAt = time.Now()
	user.Verified = false
	user.Password = password_hasing

	res, err := user_collection.InsertOne(context.TODO(), user)

	if err != nil {
		return nil, err
	}

	insertedID, ok := res.InsertedID.(primitive.ObjectID)
	if !ok {
		return nil, errors.New("failed to convert inserted ID to ObjectID")
	}
	idString := insertedID.Hex()
	token, err := helper.GenerateToken(5*time.Minute, idString, user.Email, user.Username)

	if err != nil {
		return nil, err
	}

	tokenResponse, err := helper.GenerateToken(5*24*time.Hour, idString, user.Email, user.Username)

	if err != nil {
		return nil, err
	}

	link := helper.GetENV("SERVER_BASE_URL") + "/api/users/verify/" + token
	helper.SendMail(user.Email, link)

	return &tokenResponse, nil
}
