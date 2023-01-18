package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/nutthanonn/web-programming-server/pkg/interface/controller"
	"github.com/nutthanonn/web-programming-server/pkg/interface/presenter"
)

func GetPost(co controller.AppController) fiber.Handler {
	return func(c *fiber.Ctx) error {
		p := presenter.NewPostPresenter()

		post, err := co.Post.GetPost()

		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(p.PostErrorResponse(err))
		}

		return c.Status(fiber.StatusOK).JSON(p.PostSeccessResponse(post))
	}
}
