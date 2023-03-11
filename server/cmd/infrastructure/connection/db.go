package connection

import (
	"context"

	"github.com/one-planet/pkg/helper"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func MongoConnection() *mongo.Client {
	clientOptions := options.Client().ApplyURI(helper.GetENV("MONGO_URL"))
	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		panic(err)
	}

	return client
}
