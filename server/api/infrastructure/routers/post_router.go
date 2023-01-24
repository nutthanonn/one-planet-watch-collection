package routers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/nutthanonn/go-clean-architecture-nosql/api/infrastructure/handlers"
	"github.com/nutthanonn/go-clean-architecture-nosql/pkg/interface/controller"
)

func PostRouter(app fiber.Router, co controller.AppController) {
	app.Get("/posts", handlers.GetPost(co))
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})
}
