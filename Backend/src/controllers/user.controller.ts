import { red } from "colors"
import { Request, Response } from "express"
import { UpdateResult } from "typeorm"
import { BaseController } from "../config"
import { UserService } from "../services"


/**
 * The `UserController` class is a class that contains methods that are used to 
 * perform CRUD operations on the `UserEntity` class 
 * @class
 * @extends BaseController<UserService>
 * @author Carlos Páez
 */
export class UserController extends BaseController<UserService> {
    constructor () {
        super( UserService )
    }

    /**
     * Method to obtain registered users in the database
     * @param {Request} req - Request - The request object
     * @param {Response} res - Response =&gt; Express Response object
     * @returns An object with the sent values of from, limit, all, order, the number of 
     * records returned by the query, the total number of records, and the array of users
    */
    public findUsers = async ( req: Request, res: Response ) => {
        try {
            const { from = 0, limit = 10, all = false, order = 'ASC' } = req.query

            const { 0: data, 1: totalCount } = await this._service.findUsers( {
                from: Number( from ),
                limit: Number( limit ),
                all: Boolean( all ),
                order: String( order ).toUpperCase()
            } )
            if ( !totalCount || !data.length ) return this._httpResponse.NotFound( res, `There are no results for the search` )

            return this._httpResponse.Ok( res, {
                from, limit, all, order,
                partialCount: data.length, totalCount,
                data
            } )
        } catch ( error ) {
            console.log( red( `Error in UserController:findUsers: ` ), error )
            return this._httpResponse.InternalServerError( res, error )
        }
    }

    /**
     * It's a function that receives a request and a response, and it returns a response
     * @param {Request} req - Request -&gt; The request object
     * @param {Response} res - Response =&gt; The response object
     * @returns The data from the database.
     */
    public findUserById = async ( req: Request, res: Response ) => {
        try {
            const { id } = req.params

            const data = await this._service.findOneUserById( { id, withPost: true } )

            if ( !data ) return this._httpResponse.NotFound( res, `There are no results for the id '${ id }'` )

            return this._httpResponse.Ok( res, data )
        } catch ( error ) {
            console.log( red( 'Error en UserController:findUserById: ' ), error )
            return this._httpResponse.InternalServerError( res, error )
        }
    }


    /**
     * Adding a user to the database
     * @param {Request} req - Request - The request object
     * @param {Response} res - Response =&gt; Express Response object
     * @returns An object with the embedded information
     */
    public createUser = async ( req: Request, res: Response ): Promise<unknown> => {
        try {
            const user = req.body

            const data = await this._service.createUser( { ...user } )

            return this._httpResponse.Created( res, data )
        } catch ( error ) {
            console.log( red( `Error in UserController:createUser: ` ), error )
            return this._httpResponse.InternalServerError( res, error )
        }
    }


    /**
     * Update a user by their id, except for the `email`, `username`, and `password` fields
     * @param {Request} req - Request - The request object
     * @param {Response} res - Response =&gt; Express Response object
     * @returns An object with the number of affected rows
     */
    public updateUserById = async ( req: Request, res: Response ): Promise<unknown> => {
        try {
            const { id } = req.params
            const user = req.body

            const data: UpdateResult = await this._service.updateUser( id, { ...user } )

            if ( !data.affected ) return this._httpResponse.BadRequest( res, `Changes have not been applied` )

            return this._httpResponse.Ok( res, data )
        } catch ( error ) {
            console.log( red( `Error in UserController:updateUserById: ` ), error )
            return this._httpResponse.InternalServerError( res, error )
        }
    }
}