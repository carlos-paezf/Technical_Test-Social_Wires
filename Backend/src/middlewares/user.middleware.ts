import { validate } from "class-validator"
import { red } from "colors"
import { NextFunction, Request, Response } from "express"
import { UserDTO, UserPartialDTO } from "../dtos"
import { UserService } from "../services"
import { HttpResponse } from "../shared/response/http.response"


/**
 * It validates the user's input and if there are errors, 
 * it returns a bad request response 
 * @class
 * @author Carlos Páez
 */
export class UserMiddleware {
    private readonly _service: UserService
    private readonly _httpResponse: HttpResponse

    constructor () {
        this._service = new UserService()
        this._httpResponse = new HttpResponse()
    }


    /**
     * It's a middleware function that validates the id parameter of the request object
     * @param {Request} req - Request, res: Response, next: NextFunction
     * @param {Response} res - Response -&gt; The response object
     * @param {NextFunction} next - NextFunction
     * @returns The next() function is being returned.
     */
    public idParamValidator = async ( req: Request, res: Response, next: NextFunction ) => {
        try {
            const { id } = req.params
            const valid = new UserPartialDTO()

            valid.id = id

            validate( valid ).then( async ( error ) => {
                if ( error.length ) {
                    return this._httpResponse.PreconditionFailed( res, error )
                } else {
                    const data = await this._service.findOneUserById( { id, withPost: false } )
                    if ( !data ) return this._httpResponse.NotFound( res, `There are no results for the id '${ id }'` )
                    return next()
                }
            } )
        } catch ( error ) {
            console.log( red( 'Error en UserMiddleware:idParamValidator: ' ), error )
            return this._httpResponse.InternalServerError( res, error )
        }
    }

    /**
     * If the username or email is already being used, return a bad request response, otherwise, continue
     * to the next middleware.
     * @param {Request} req - Request - The request object
     * @param {Response} res - Response - The response object
     * @param {NextFunction} next - NextFunction - The next middleware function in the stack.
     * @returns The return value of the next() function.
     */
    public usernameAndEmailValidator = async ( req: Request, res: Response, next: NextFunction ) => {
        const { username, email } = req.body
        if ( username ) {
            const userByUsername = await this._service.findUserByUsername( username )

            if ( userByUsername ) {
                return this._httpResponse.BadRequest( res, `The username '${ username }' is already being used` )
            }
        }

        if ( email ) {
            const userByEmail = await this._service.findUserByEmail( email )

            if ( userByEmail ) {
                return this._httpResponse.BadRequest( res, `The email '${ email }' is already being used` )
            }
        }

        return next()
    }

    /**
     * It validates the user's input and if there are errors, it returns a bad request response.
     * @param {Request} req - Request - The request object
     * @param {Response} res - Response - Express response object
     * @param {NextFunction} next - NextFunction - The next middleware function in the stack.
     */
    public userValidator = ( req: Request, res: Response, next: NextFunction ) => {
        const { username, fullName, email, password } = req.body

        const valid = new UserDTO()

        valid.username = username
        valid.fullName = fullName
        valid.email = email
        valid.password = password

        validate( valid ).then( ( error ) => {
            return error.length ? this._httpResponse.PreconditionFailed( res, error ) : next()
        } )
    }
}