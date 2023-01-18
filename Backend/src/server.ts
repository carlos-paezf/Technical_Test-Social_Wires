import { blue, green, red } from "colors"
import cors from "cors"
import express from "express"
import morgan from "morgan"
import "reflect-metadata"
import { DataSource } from "typeorm"
import { ConfigServer } from "./config"
import { UserRouter } from "./router"


/**
 * @class
 * @extends ConfigServer
 * @author Carlos Páez
 */
class ServerBootstrap extends ConfigServer {
    private _app: express.Application = express()
    private _port: number = this.getNumberEnv( 'SERVER_PORT' ) || 8000


    constructor () {
        super()

        this._dbConnect()
        this._middlewares()
        this._app.use( '/api', this._routers )

        this._listen()
    }


    /**
     * It returns an array of express routers
     * @returns An array of express.Router objects.
    */
    private _routers (): express.Router[] {
        return [
            new UserRouter().router
        ]
    }


    /**
     * It connects to the database.
     * @returns A promise.
     */
    private async _dbConnect (): Promise<DataSource | void> {
        return this.dbConnection
            .then( () => console.log( blue.italic( `  > Conexión establecida con la base de datos ${ this.getEnvironment( 'DB_DATABASE' ) }` ) ) )
            .catch( ( error ) => console.log( red( '  > Error intentando conectar la base de datos: ' ), error ) )
    }


    /**
    * This function is used to set up the middlewares for the express application.
    */
    private _middlewares = (): void => {
        this._app.use( express.json( { limit: "10mb" } ) )
        this._app.use( express.urlencoded( { limit: "10mb", extended: true, parameterLimit: 1000000 } ) )
        this._app.use( morgan( 'common' ) )
        this._app.use( cors() )
    }

    /**
     * This function listens for requests on the port specified in the constructor.
     */
    private _listen (): void {
        this._app.listen( this._port, () => {
            console.log( green( `> Server listen on port: ${ this._port }` ) )
        } )
    }
}


new ServerBootstrap()