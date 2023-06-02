package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Comment struct {
	ID       primitive.ObjectID `json:"id" bson:"_id"`
	Avatar   string             `json:"avatar" bson:"avatar"`
	Username string             `json:"username" bson:"username"`
	Content  string             `json:"content" bson:"content"`
	CreateAt time.Time          `json:"created_at,omitempty" bson:"created_at,omitempty"`
}

type Post struct {
	ID          primitive.ObjectID `json:"id" bson:"_id"`
	Images      []string           `json:"images,omitempty" bson:"images,omitempty"`
	Description string             `json:"description,omitempty" bson:"description,omitempty"`
	Location    string             `json:"location,omitempty" bson:"location,omitempty"`
	Comments    []Comment          `json:"comments,omitempty" bson:"comments,omitempty"`
	CreateAt    time.Time          `json:"created_at,omitempty" bson:"created_at,omitempty"`
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

type UserUpdateModel struct {
	Username          string    `json:"username,omitempty" bson:"username,omitempty" validate:"required"`
	Password          string    `json:"password,omitempty" bson:"password,omitempty" validate:"required"`
	Bio               string    `json:"bio,omitempty" bson:"bio,omitempty"`
	Avatar            string    `json:"avatar,omitempty" bson:"avatar,omitempty"`
	BackgroundProfile string    `json:"background_profile,omitempty" bson:"background_profile,omitempty"`
	UpdatedAt         time.Time `json:"updated_at,omitempty" bson:"updated_at,omitempty"`
}
