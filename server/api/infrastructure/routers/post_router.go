package routers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/nutthanonn/web-programming-server/api/infrastructure/handlers"
	"github.com/nutthanonn/web-programming-server/pkg/interface/controller"
)

func PostRouter(app fiber.Router, co controller.AppController) {
	app.Get("/posts", handlers.GetPost(co))
}
