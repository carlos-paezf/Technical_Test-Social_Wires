import { validate } from "class-validator"
import { NextFunction, Request, Response } from "express"
import { PostDTO } from "../dtos/post.dto"
import { HttpResponse } from "../shared/response/http.response"


export class PostMiddleware {

    constructor ( private readonly _httpResponse: HttpResponse = new HttpResponse() ) { }

    /**
     * It validates the request body against the PostDTO class, and if there are any errors, it returns
     * a 422 response with the errors.
     * @param {Request} req - Request - The request object
     * @param {Response} res - Response - The response object
     * @param {NextFunction} next - NextFunction - This is a function that will be called to pass
     * control to the next middleware function.
     */
    public postValidator = ( req: Request, res: Response, next: NextFunction ) => {
        const { title, content, author } = req.body

        const valid = new PostDTO()

        valid.title = title
        valid.content = content
        valid.author = author

        validate( valid ).then( ( error ) => {
            return error.length ? this._httpResponse.PreconditionFailed( res, error ) : next()
        } )
    }
}