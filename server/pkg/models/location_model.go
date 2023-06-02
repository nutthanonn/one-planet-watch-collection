package models

type RequestLocationModel struct {
	Location string `json:"location,omitempty" bson:"location,omitempty"`
}
