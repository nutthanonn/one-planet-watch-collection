package repository

import (
	"context"
	"errors"
	"strings"
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

	if len(user.Password) > 20 {
		return nil, errors.New("password is too long")
	}

	if len(user.Password) < 6 {
		return nil, errors.New("password is too short")
	}

	if user.Email == "" {
		return nil, errors.New("email is required")
	}

	if user.Username == "" {
		return nil, errors.New("username is required")
	}

	if ok := helper.ValidateUsername(user.Username); !ok {
		return nil, errors.New("username is not allowed")
	}

	user.Username = strings.ToLower(user.Username)

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
	user.Avatar = "https://source.unsplash.com/random/1200x400/?background-texture"
	user.BackgroundProfile = "https://source.unsplash.com/random/1200x400/?background-texture"
	user.Password = password_hasing
	user.Role = "user"
	user.Follower = []primitive.ObjectID{}
	user.Following = []primitive.ObjectID{}
	user.Posts = []models.Post{}
	user.Favorite_List = []primitive.ObjectID{}

	res, err := user_collection.InsertOne(context.TODO(), user)

	if err != nil {
		return nil, err
	}

	insertedID, ok := res.InsertedID.(primitive.ObjectID)
	if !ok {
		return nil, errors.New("failed to convert inserted ID to ObjectID")
	}
	idString := insertedID.Hex()
	token, err := helper.GenerateToken(5*time.Minute, idString, user.Email, user.Username, user.Verified)

	if err != nil {
		return nil, err
	}

	returnToken, err := helper.GenerateToken(5*24*time.Hour, idString, user.Email, user.Username, user.Verified)
	if err != nil {
		return nil, err
	}

	link := helper.GetENV("SERVER_BASE_URL") + "/api/users/verify/" + token
	helper.SendMail(user.Email, link)

	return &returnToken, nil
}
