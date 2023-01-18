import { BaseRouter } from "../config"
import { PostController } from "../controllers"
import { PostMiddleware } from "../middlewares"


export class PostRouter extends BaseRouter<PostController, PostMiddleware> {
    constructor () {
        super( PostController, PostMiddleware )
    }

    protected routes (): void {
        this.router.get( '/post', this.controller.findAllPost )

        this.router.post(
            '/post',
            [
                this.middleware.postValidator
            ],
            this.controller.createPost
        )
    }
}