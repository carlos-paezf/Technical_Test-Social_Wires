import { red } from "colors"
import { Request, Response } from "express"
import { UserEntity } from "../../entities"

import { HttpResponse } from "../../shared/response/http.response"
import { AuthService } from "../services/auth.service"


export class AuthController extends AuthService {

    constructor ( private readonly _httpResponse: HttpResponse = new HttpResponse() ) {
        super()
    }

    /**
     * It takes a user object, generates a JWT, and then sets the JWT as a cookie on the response
     * object.
     * @param {Request} req - Request - The request object
     * @param {Response} res - Response - the response object
     * @returns The accessToken is being returned.
     */
    public login = async ( req: Request, res: Response ) => {
        try {
            const { emailOrUsername, password } = req.body

            if ( !emailOrUsername || emailOrUsername.trim() === '' ) {
                return this._httpResponse.BadRequest( res, `Unable to send empty email field` )
            }

            if ( !password || password.trim === '' ) {
                return this._httpResponse.BadRequest( res, `Unable to send empty password field` )
            }

            const user = await this.validateUser( emailOrUsername, password )
            if ( !user ) return this._httpResponse.Unauthorized( res, `Invalid email/username or password` )

            const encode = await this.generateJWT( user.id )
            if ( !encode ) return this._httpResponse.Unauthorized( res, `You do not have permission to access` )

            return this._httpResponse.Ok( res, encode )
        } catch ( error ) {
            console.log( red( `Error in AuthController:login: ` ), error )
            return this._httpResponse.InternalServerError( res, error )
        }
    }

    /**
     * This function creates a user, sends a response to the client, and then saves the user and JWT in the
     * request.
     * @param {Request} req - Request
     * @param {Response} res - Response =&gt; Express.Response
     * @returns The user object
     */
    public register = async ( req: Request, res: Response ) => {
        try {
            const data = req.body

            const user = await this._service.createUser( { ...data } )

            const encode = await this.generateJWT( user.id )
            if ( !encode ) return this._httpResponse.Unauthorized( res, `You do not have permission to access` )

            return this._httpResponse.Created( res, encode )
        } catch ( error ) {
            console.log( red( `Error in AuthController:register: ` ), error )
            return this._httpResponse.InternalServerError( res, error )
        }
    }

    /**
     * It checks if the email or username is already registered in the database
     * @param {Request} req - Request -&gt; The request object
     * @param {Response} res - Response -&gt; this is the response object that will be returned to the
     * client
     * @returns The return is a function that is being called with the parameters res and error.
     */
    public validateExistsEmailOrUsername = async ( req: Request, res: Response ) => {
        try {
            const { email = '', username = '' } = req.query

            if ( String( email ).trim() !== '' ) {
                const data = await this._service.findUserByEmail( String( email ) )

                if ( data ) return this._httpResponse.Ok( res, { isUnique: false } )
            }

            if ( String( username ).trim() !== '' ) {
                const data = await this._service.findUserByUsername( String( username ) )

                if ( data ) return this._httpResponse.Ok( res, { isUnique: false } )
            }

            return this._httpResponse.Ok( res, { isUnique: true } )
        } catch ( error ) {
            console.log( red( `Error in AuthController:validateExistsEmailOrUsername: ` ), error )
            return this._httpResponse.InternalServerError( res, error )
        }
    }

    /**
     * If the user is found in the request, save the user and JWT in the request.
     * @param {Request} req - Request - The request object
     * @param {Response} res - Response =&gt; Express.Response
     * @returns The user and the JWT token
     */
    public renewToken = async ( req: Request, res: Response ) => {
        try {
            const user = req.user as UserEntity
            if ( !user ) return this._httpResponse.NotFound( res, `No user found in the request` )

            const encode = await this.generateJWT( user.id )
            if ( !encode ) return this._httpResponse.Unauthorized( res, `You do not have permission to access` )

            return this._httpResponse.Ok( res, encode )
        } catch ( error ) {
            console.log( red( `Error in AuthController:renewToken: ` ), error )
            return this._httpResponse.InternalServerError( res, error )
        }
    }
}