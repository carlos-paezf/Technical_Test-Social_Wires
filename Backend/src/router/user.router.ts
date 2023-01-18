import { BaseRouter } from "../config"
import { UserController } from "../controllers"
import { UserMiddleware } from "../middlewares"


/**
 * @class
 * @extends BaseRouter
 * @author Carlos Páez
 */
export class UserRouter extends BaseRouter<UserController, UserMiddleware> {
    constructor () {
        super( UserController, UserMiddleware )
    }

    protected routes (): void {
        this.router.param( 'id', this.middleware.idParamValidator )

        this.router.get( '/users', this.controller.findUsers )

        this.router.get( '/users/:id', this.controller.findUserById )
    }
}