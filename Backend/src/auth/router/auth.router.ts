import { BaseRouter } from "../../config"
import { UserMiddleware } from "../../middlewares"
import { AuthController } from "../controllers/auth.controller"


export class AuthRouter extends BaseRouter<AuthController, UserMiddleware> {
    constructor () {
        super( AuthController, UserMiddleware )
    }

    protected routes (): void {
        this.router.post( '/login', this.controller.login )

        this.router.post(
            '/register',
            [
                this.middleware.usernameAndEmailValidator,
                this.middleware.userValidator
            ],
            this.controller.register
        )

        this.router.get(
            '/validate',
            this.controller.validateExistsEmailOrUsername
        )
    }
}