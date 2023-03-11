package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID         primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	Username   string             `json:"username,omitempty" bson:"username,omitempty" validate:"required"`
	Email      string             `json:"email,omitempty" bson:"email,omitempty" validate:"required,email"`
	Password   string             `json:"password,omitempty" bson:"password,omitempty" validate:"required"`
	Bio        string             `json:"bio,omitempty" bson:"bio,omitempty"`
	Image      string             `json:"image,omitempty" bson:"image,omitempty"`
	Follower   []User             `json:"follower" bson:"follower"`
	Following  []User             `json:"following" bson:"following"`
	Verified   bool               `json:"verified" bson:"verified"`
	Role       string             `json:"role" bson:"role"`
	MemberShip bool               `json:"membership" bson:"membership"`
	CreateAt   time.Time          `json:"created_at,omitempty" bson:"created_at,omitempty"`
	UpdatedAt  time.Time          `json:"updated_at,omitempty" bson:"updated_at,omitempty"`
}

type UserLogin struct {
	Email    string `json:"email" bson:"email"`
	Password string `json:"password" bson:"password"`
}
