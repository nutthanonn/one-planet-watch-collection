package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type RequestModel struct {
	ID          primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	User_id     primitive.ObjectID `json:"user_id,omitempty" bson:"user_id,omitempty"`
	Read        bool               `json:"read,omitempty" bson:"read,omitempty"`
	Brand       string             `json:"brand,omitempty" bson:"brand,omitempty"`
	Model       string             `json:"model,omitempty" bson:"model,omitempty"`
	Name        string             `json:"name,omitempty" bson:"name,omitempty"`
	Description string             `json:"description,omitempty" bson:"description,omitempty"`
	Image       string             `json:"image,omitempty" bson:"image,omitempty"`
}
