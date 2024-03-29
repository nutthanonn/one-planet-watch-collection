package repository

import (
	"github.com/go-redis/redis"
	"github.com/one-planet/pkg/models"
	"go.mongodb.org/mongo-driver/mongo"
)

type userRepository struct {
	mongo_database *mongo.Database
	redis_client   *redis.Client
}

type UserRepository interface {
	CreateUser(user *models.User) (*string, error)
	GetUserByUsername(username string) (*models.User, error)
	VerifiedUser(ID string) error
	UpdateUser(bearerToken *string, updateData *models.UserUpdateModel) (*string, error)
	LoginUser(user *models.UserLogin) (*string, error)
	GetUserById(ID string) (*models.User, error)
	PasswordReset(username, password string) error
	ForgotPassword(username string) error
}

func NewUserRepository(mongo_database *mongo.Database, redis_client *redis.Client) UserRepository {
	return &userRepository{
		mongo_database: mongo_database,
		redis_client:   redis_client,
	}
}
