package registry

import (
	ic "github.com/nutthanonn/go-clean-architecture-nosql/pkg/interface/controller"
	ip "github.com/nutthanonn/go-clean-architecture-nosql/pkg/interface/presenter"
	ir "github.com/nutthanonn/go-clean-architecture-nosql/pkg/interface/repository"
	ui "github.com/nutthanonn/go-clean-architecture-nosql/pkg/usecase/interacter"
	up "github.com/nutthanonn/go-clean-architecture-nosql/pkg/usecase/presenter"
	ur "github.com/nutthanonn/go-clean-architecture-nosql/pkg/usecase/repository"
)

func (r *registry) NewPostController() ic.PostController {
	return ic.NewPostController(r.NewPostInteractor())
}

func (r *registry) NewPostInteractor() ic.PostController {
	return ui.NewPostInteractor(r.NewPostRepository(), r.NewPostPresenter())
}

func (r *registry) NewPostRepository() ur.PostRepository {
	return ir.NewPostRepository(r.db)
}

func (r *registry) NewPostPresenter() up.PostPresenter {
	return ip.NewPostPresenter()
}
