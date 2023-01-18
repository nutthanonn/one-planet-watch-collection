package registry

import (
	"github.com/nutthanonn/web-programming-server/pkg/interface/controller"
	"go.mongodb.org/mongo-driver/mongo"
)

type registry struct {
	db *mongo.Database
}

type Registry interface {
	NewAppController() controller.AppController
}

func NewRegistry(db *mongo.Database) Registry {
	return &registry{db}
}

func (r *registry) NewAppController() controller.AppController {
	return controller.AppController{
		Post: r.NewPostController(),
	}
}
