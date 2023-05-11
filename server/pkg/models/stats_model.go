package models

type Stats struct {
	Watch      Watches `json:"watch"`
	Percentage float64 `json:"percentage"`
}
