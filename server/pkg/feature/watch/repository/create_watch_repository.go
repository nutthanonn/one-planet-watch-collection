package repository

import (
	"context"
	"errors"

	"github.com/one-planet/pkg/feature/user/repository"
	"github.com/one-planet/pkg/models"
)

func (wr *watchRepository) CreateWatch(userId string, watchModel *models.Watches) error {
	user_repository := repository.NewUserRepository(wr.mongo_database, wr.redis_client)

	user, err := user_repository.GetUserById(userId)

	if err != nil {
		return err
	}

	if user.Role != "admin" {
		return errors.New("you are not admin")
	}

	watch_collection := wr.mongo_database.Collection("watches")
	_, err = watch_collection.InsertOne(context.TODO(), watchModel)

	if err != nil {
		return err
	}

	return nil
}
