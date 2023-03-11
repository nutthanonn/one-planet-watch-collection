package presenter

import (
	"time"

	"github.com/gin-gonic/gin"
	"github.com/one-planet/pkg/models"
)

type UserResponse struct {
	Username   string        `json:"username,omitempty" bson:"username,omitempty"`
	Email      string        `json:"email,omitempty" bson:"email,omitempty"`
	Bio        string        `json:"bio,omitempty" bson:"bio,omitempty"`
	Image      string        `json:"image,omitempty" bson:"image,omitempty"`
	Follower   []models.User `json:"follower" bson:"follower"`
	Following  []models.User `json:"following" bson:"following"`
	Verified   bool          `json:"verified" bson:"verified"`
	MemberShip bool          `json:"membership" bson:"membership"`
	CreateAt   time.Time     `json:"created_at,omitempty" bson:"created_at,omitempty"`
}

type UserToken struct {
	Token *string `json:"token,omitempty" bson:"token,omitempty"`
}

type userPresenter struct {
}

type UserPresenter interface {
	UserErrorResponse(err error) gin.H
	CreateUserSuccessResponse(token *string) gin.H
	UserSeccessResponse(user *models.User) gin.H
	UpdateUserSeccessResponse(user *models.User) gin.H
	UserLoginResponse(token *string) gin.H
}

func NewUserPresenneter() UserPresenter {
	return &userPresenter{}
}

func (up *userPresenter) CreateUserSuccessResponse(token *string) gin.H {
	return gin.H{
		"status":  "success",
		"error":   false,
		"message": "User registration successful",
		"data": &UserToken{
			Token: token,
		},
	}
}

func (up *userPresenter) UserErrorResponse(err error) gin.H {
	return gin.H{
		"status":  "error",
		"error":   true,
		"message": err.Error(),
		"data":    nil,
	}
}

func (up *userPresenter) UpdateUserSeccessResponse(user *models.User) gin.H {
	return gin.H{
		"status":  "success",
		"error":   false,
		"message": "user update successful",
		"data":    nil,
	}
}

func (up *userPresenter) UserSeccessResponse(user *models.User) gin.H {
	return gin.H{
		"status":  "success",
		"error":   false,
		"message": "user data",
		"data": &UserResponse{
			Username:   user.Username,
			Email:      user.Email,
			Bio:        user.Bio,
			Image:      user.Image,
			Follower:   user.Follower,
			Following:  user.Following,
			Verified:   user.Verified,
			MemberShip: user.MemberShip,
			CreateAt:   user.CreateAt,
		},
	}
}

func (up *userPresenter) UserLoginResponse(token *string) gin.H {
	return gin.H{
		"status":  "success",
		"error":   false,
		"message": "user login successful",
		"data": &UserToken{
			Token: token,
		},
	}
}
