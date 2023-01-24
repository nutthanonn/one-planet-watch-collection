package registry

import (
	"github.com/nutthanonn/go-clean-architecture-nosql/pkg/interface/controller"
	"go.mongodb.org/mongo-driver/mongo"
)

type registry struct {
	db *mongo.Database
}

type Registry interface {
	NewAppController() controller.AppController
}

func NewRegistry(db *mongo.Database) Registry {
	return &registry{db: db}
}

func (r *registry) NewAppController() controller.AppController {
	return controller.AppController{
		Post: r.NewPostController(),
	}
}
