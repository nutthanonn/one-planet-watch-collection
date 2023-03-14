package presenter

import (
	"github.com/gin-gonic/gin"
	"github.com/one-planet/pkg/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type searchPresenter struct {
}

type SearchPresenter interface {
	SearchSuccessResponse(searchUser []*models.User) gin.H
	SearchErrorResponse(err error) gin.H
}

func NewSearchPresenter() SearchPresenter {
	return &searchPresenter{}
}

type UserResponse struct {
	ID        primitive.ObjectID   `json:"id"`
	Username  string               `json:"username"`
	Bio       string               `json:"bio,omitempty"`
	Avatar    string               `json:"avatar,omitempty"`
	Follower  []primitive.ObjectID `json:"follower,omitempty"`
	Following []primitive.ObjectID `json:"following,omitempty"`
	Posts     []models.Post        `json:"post,omitempty"`
}

type SearchUserResponse struct {
	Users []UserResponse `json:"users"`
}

func (sp *searchPresenter) SearchSuccessResponse(searchUser []*models.User) gin.H {

	var userResponse []UserResponse

	for _, v := range searchUser {
		userResponse = append(userResponse, UserResponse{
			ID:       v.ID,
			Username: v.Username,
			Avatar:   v.Avatar,
			Bio:      v.Bio,
			Follower: v.Follower,
			Posts:    v.Posts,
		})
	}

	return gin.H{
		"data": &SearchUserResponse{
			Users: userResponse,
		},
		"error":  nil,
		"status": "success",
	}
}

func (sp *searchPresenter) SearchErrorResponse(err error) gin.H {
	return gin.H{
		"data":   nil,
		"error":  err.Error(),
		"status": "error",
	}
}
