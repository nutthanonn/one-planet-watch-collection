package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Watches struct {
	ID               primitive.ObjectID   `json:"id,omitempty" bson:"_id,omitempty"`
	Brand            string               `json:"brand,omitempty" bson:"brand,omitempty"`
	Model            string               `json:"model,omitempty" bson:"model,omitempty"`
	Name             string               `json:"name,omitempty" bson:"name,omitempty"`
	Description      string               `json:"description,omitempty" bson:"description,omitempty"`
	Image            string               `json:"image,omitempty" bson:"image,omitempty"`
	Sub_images       []string             `json:"sub_images,omitempty" bson:"sub_images,omitempty"`
	Sub_descriptions []string             `json:"sub_descriptions,omitempty" bson:"sub_descriptions,omitempty"`
	Favorite         []primitive.ObjectID `json:"favorite,omitempty" bson:"favorite,omitempty"`
}

type Watch_Log struct {
	ID         primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	Watch_id   primitive.ObjectID `json:"watches_id,omitempty" bson:"watches_id,omitempty"`
	User_id    primitive.ObjectID `json:"user_id,omitempty" bson:"user_id,omitempty"`
	IsFavorite bool               `json:"is_favorite,omitempty" bson:"is_favorite,omitempty"`
	CreateAt   time.Time          `json:"created_at,omitempty" bson:"created_at,omitempty"`
}