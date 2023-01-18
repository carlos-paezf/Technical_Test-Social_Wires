import { red } from "colors"
import { Request, Response } from "express"
import { BaseController } from "../config"
import { PostService } from "../services/post.service"


export class PostController extends BaseController<PostService> {
    constructor () {
        super( PostService )
    }

    /**
     * It's a function that receives a request and a response, and it returns a response
     * @param {Request} req - Request, res: Response
     * @param {Response} res - Response
     * @returns The data is being returned in the following format:
     */
    public findAllPost = async ( req: Request, res: Response ) => {
        try {
            const { title = '', createdAt = new Date( '2000-01-01' ) } = req.query

            const { 0: data, 1: totalCount } = await this._service.findAllPosts( {
                title: String( title ),
                createdAt: ( !createdAt ) ? new Date( '2000-01-01' ) : new Date( String( createdAt ) )
            } )

            if ( !totalCount || !data.length ) return this._httpResponse.NotFound( res, 'There are not result for the search' )

            return this._httpResponse.Ok( res, {
                title, createdAt: new Date( String( createdAt ) ), partialCount: data.length, totalCount,
                data
            } )
        } catch ( error ) {
            console.log( red( 'Error en PostController:findAllPost: ' ), error )
            return this._httpResponse.InternalServerError( res, error )
        }
    }

    /**
     * It takes a request and a response, and returns a promise of an unknown type.
     * @param {Request} req - Request - This is the request object that is passed to the controller.
     * @param {Response} res - Response: This is the response object that will be returned to the
     * client.
     * @returns The response object.
     */
    public createPost = async ( req: Request, res: Response ): Promise<unknown> => {
        try {
            const post = req.body

            const data = await this._service.createPost( { ...post } )

            return this._httpResponse.Created( res, data )
        } catch ( error ) {
            console.log( red( 'Error en PostController:createPost: ' ), error )
            return this._httpResponse.InternalServerError( res, error )
        }
    }
}