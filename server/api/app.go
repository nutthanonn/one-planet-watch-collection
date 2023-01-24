package main

import (
	"context"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/nutthanonn/go-clean-architecture-nosql/api/infrastructure/datastore"
	"github.com/nutthanonn/go-clean-architecture-nosql/api/infrastructure/routers"
	"github.com/nutthanonn/go-clean-architecture-nosql/pkg/registry"
)

func main() {
	// connect to mongodb
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := datastore.Connect(ctx)
	if err != nil {
		panic(err)
	}

	defer func() {
		if err := client.Disconnect(ctx); err != nil {
			panic(err)
		}
	}()

	quickStart := client.Database("go-nosql")

	app := fiber.New()

	api := app.Group("/api")
	r := registry.NewRegistry(quickStart)
	routers.PostRouter(api, r.NewAppController())

	app.Listen(":8080")
}
