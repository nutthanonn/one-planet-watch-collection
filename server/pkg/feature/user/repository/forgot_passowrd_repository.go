package repository

import (
	"context"
	"errors"
	"reflect"
	"time"

	"github.com/one-planet/pkg/helper"
	"github.com/one-planet/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
)

func (ur *userRepository) ForgotPassword(username string) error {
	user_collection := ur.mongo_database.Collection("users")

	filter := bson.M{"username": username}
	var user models.User

	user_collection.FindOne(context.TODO(), filter).Decode(&user)

	if reflect.DeepEqual(user, models.User{}) {
		return errors.New("user not found")
	}

	token, err := helper.GenerateToken(5*time.Minute, "Password Reset", "", user.Username, false)

	if err != nil {
		return err
	}

	link := helper.GetENV("CLIENT_BASE_URL") + "/password/reset/" + token
	helper.SendMail("Welcome to the Password Reset", "You're receiving this email because you have requested a password reset. If you did not initiate this request, please disregard this message.", user.Email, link)

	return nil
}
