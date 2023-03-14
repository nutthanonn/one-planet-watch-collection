package models

import (
	"time"

	"github.com/google/uuid"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Post struct {
	ID          uuid.UUID `json:"id" bson:"id"`
	Images      []string  `json:"images,omitempty" bson:"images,omitempty"`
	Description string    `json:"description,omitempty" bson:"description,omitempty"`
}

type User struct {
	ID                primitive.ObjectID   `json:"id,omitempty" bson:"_id,omitempty"`
	Username          string               `json:"username,omitempty" bson:"username,omitempty" validate:"required"`
	Email             string               `json:"email,omitempty" bson:"email,omitempty" validate:"required,email"`
	Password          string               `json:"password,omitempty" bson:"password,omitempty" validate:"required"`
	Bio               string               `json:"bio,omitempty" bson:"bio,omitempty"`
	Avatar            string               `json:"avatar,omitempty" bson:"avatar,omitempty"`
	BackgroundProfile string               `json:"background_profile,omitempty" bson:"background_profile,omitempty"`
	Follower          []primitive.ObjectID `json:"follower" bson:"follower"`
	Following         []primitive.ObjectID `json:"following" bson:"following"`
	Verified          bool                 `json:"verified" bson:"verified"`
	Role              string               `json:"role" bson:"role"`
	MemberShip        bool                 `json:"membership" bson:"membership"`
	Posts             []Post               `json:"posts" bson:"posts"`
	Favorite_List     []primitive.ObjectID `json:"favorite_list" bson:"favorite_list"`
	CreateAt          time.Time            `json:"created_at,omitempty" bson:"created_at,omitempty"`
	UpdatedAt         time.Time            `json:"updated_at,omitempty" bson:"updated_at,omitempty"`
}

type UserLogin struct {
	Username string `json:"username" bson:"username"`
	Password string `json:"password" bson:"password"`
}
