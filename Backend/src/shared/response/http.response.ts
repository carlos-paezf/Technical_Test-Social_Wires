import { Response } from "express"


/** 
 * Defining the HTTP status codes. 
 * 
 * @author Carlos Páez
 */
export enum HttpStatus {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    PRECONDITION_FAILED = 412,
    INTERNAL_SERVER_ERROR = 500
}


/**
 * @class
 * @author Carlos Páez
 */
export class HttpResponse {
    /**
     * It returns a response object with a status code of 200 and a message of 'Success'
     * @param {Response} res - Response - This is the response object that is passed to the controller
     * method.
     * @param {unknown} [data] - The data you want to send back to the client.
     * @returns A response object with a status of 200 and a json object with a status of 200, a
     * statusMsg of 'Success', and a data property.
     */
    public Ok ( res: Response, data?: unknown ): Response<unknown> {
        return res.status( HttpStatus.OK ).json( {
            status: HttpStatus.OK,
            statusMsg: 'Success',
            data
        } )
    }

    /**
     * It returns a response with a status code of 201 and a message of "Created"
     * @param {Response} res - Response - This is the response object that is passed to the controller
     * method.
     * @param {unknown} [data] - The data you want to send back to the client.
     * @returns A response object with a status of 201 and a json object with a status of 201, a
     * statusMsg of 'Created', and the data passed in.
     */
    public Created ( res: Response, data?: unknown ): Response<unknown> {
        return res.status( HttpStatus.CREATED ).json( {
            status: HttpStatus.CREATED,
            statusMsg: 'Created',
            data
        } )
    }

    /**
     * It returns a response with a status code of 400 and a json object with the status, statusMsg,
     * and error.
     * @param {Response} res - Response - This is the response object that is passed to the controller
     * method.
     * @param {unknown} [data] - The data you want to send back to the client.
     * @returns A response object with a status of 400 and a json object with the status, statusMsg,
     * and error.
     */
    public BadRequest ( res: Response, data?: unknown ): Response<unknown> {
        return res.status( HttpStatus.BAD_REQUEST ).json( {
            status: HttpStatus.BAD_REQUEST,
            statusMsg: 'Bad Request',
            error: data
        } )
    }

    /**
     * This function is used to send a response to the client when the client is not authorized to
     * access a resource
     * @param {Response} res - Response - This is the response object that is passed to the controller
     * method.
     * @param {unknown} [data] - The data you want to send back to the client.
     * @returns A response object with a status of 401 and a json object with the status, statusMsg,
     * and error.
     */
    public Unauthorized ( res: Response, data?: unknown ): Response<unknown> {
        return res.status( HttpStatus.UNAUTHORIZED ).json( {
            status: HttpStatus.UNAUTHORIZED,
            statusMsg: 'Unauthorized',
            error: data
        } )
    }

    /**
     * It returns a response object with a status of 403 and a json object with a status of 403, a
     * status message of 'Forbidden', and an error object
     * @param {Response} res - Response - The response object
     * @param {unknown} [data] - The data you want to send back to the client.
     * @returns A response object with a status of 403 and a json object with the status, statusMsg,
     * and error.
     */
    public Forbidden ( res: Response, data?: unknown ): Response<unknown> {
        return res.status( HttpStatus.FORBIDDEN ).json( {
            status: HttpStatus.FORBIDDEN,
            statusMsg: 'Forbidden',
            error: data
        } )
    }

    /**
     * It returns a response object with a status of 404 and a json object with a status of 404, a
     * status message of 'Not Found', and an error object
     * @param {Response} res - Response - This is the response object that is passed to the controller
     * method.
     * @param {unknown} [data] - The data that you want to send back to the client.
     * @returns A response object with a status of 404 and a json object with the status, statusMsg,
     * and error.
     */
    public NotFound ( res: Response, data?: unknown ): Response<unknown> {
        return res.status( HttpStatus.NOT_FOUND ).json( {
            status: HttpStatus.NOT_FOUND,
            statusMsg: 'Not Found',
            error: data
        } )
    }

    /**
     * It returns a response with a status code of 409.
     * @param {Response} res - Response - The response object that is passed to the function.
     * @returns A response object with a status of 409 and a status message of Conflict.
     */
    public Conflict ( res: Response, data?: unknown ): Response<unknown> {
        return res.status( HttpStatus.CONFLICT ).json( {
            status: HttpStatus.CONFLICT,
            statusMsg: 'Conflict',
            error: data
        } )
    }

    /**
     * It takes a response object and an optional data object, and returns a response object with a
     * status of 412 and a JSON object with a status, statusMsg, and error property
     * @param {Response} res - Response - This is the response object that is passed to the controller
     * method.
     * @param {unknown} [data] - The data you want to send back to the client.
     * @returns A response object with a status of 412 and a json object with the status, statusMsg,
     * and error.
     */
    public PreconditionFailed ( res: Response, data?: unknown ): Response<unknown> {
        return res.status( HttpStatus.PRECONDITION_FAILED ).json( {
            status: HttpStatus.PRECONDITION_FAILED,
            statusMsg: 'Precondition Failed',
            error: data
        } )
    }

    /**
     * It takes a response object and an optional data object and returns a response object with a
     * status of 500 and a json object with a status of 500, a statusMsg of 'Internal Server Error',
     * and an error object with the data passed in
     * @param {Response} res - Response - This is the response object that is passed to the controller
     * method.
     * @param {unknown} [data] - The data you want to send back to the client.
     * @returns A Response object with a status of 500 and a body of { status: 500, statusMsg:
     * 'Internal Server Error', error: data }
     */
    public InternalServerError ( res: Response, data?: unknown ): Response<unknown> {
        return res.status( HttpStatus.INTERNAL_SERVER_ERROR ).json( {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            statusMsg: 'Internal Server Error',
            error: data
        } )
    }
}