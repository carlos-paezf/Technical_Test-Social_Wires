import { Request, Response } from "express"
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
        this.router.get( '/users', ( req: Request, res: Response ) => this.controller.findUsers( req, res ) )
    }
}