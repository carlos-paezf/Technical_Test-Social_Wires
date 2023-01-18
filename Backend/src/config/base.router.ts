import { Router } from "express"


/**
 * `BaseRouter` is a class that takes two generic types, T and U, 
 * and creates a router that uses a controller of type T and a middleware of type U. 
 * 
 * @class
 * @author Carlos Páez
 */
export abstract class BaseRouter<T, U> {
    public router: Router
    protected controller: T
    protected middleware: U

    constructor ( TController: { new(): T }, UMiddleware: { new(): U } ) {
        this.router = Router()
        this.controller = new TController()
        this.middleware = new UMiddleware()

        this.routes()
    }

    protected routes (): void {
        throw new Error( "Not Implemented" )
    }
}