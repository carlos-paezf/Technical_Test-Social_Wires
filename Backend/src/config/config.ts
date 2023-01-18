import * as dotenv from 'dotenv'
import { DataSource } from 'typeorm'
import { AppDataSource } from './data.config'

/**
 * @class
 * @abstract
 * @author Carlos Páez
 */
export abstract class ConfigServer {
    constructor () {
        const nodeNameEnv: string = this.createPathEnv( this.nodeEnv )
        dotenv.config( {
            path: nodeNameEnv
        } )
    }

    /**
     * It returns the value of the environment variable with the name of the key passed in
     * @param {string} key - The name of the environment variable you want to get.
     * @returns The value of the environment variable.
     */
    protected getEnvironment ( key: string ) {
        return process.env[ key ]
    }

    /**
     * It gets the value of the environment variable with the given key, and then converts it to a
     * number
     * @param {string} key - The key of the environment variable you want to get.
     * @returns A number
     */
    protected getNumberEnv ( key: string ): number {
        return Number( this.getEnvironment( key ) )
    }

    /**
     * If the environment variable NODE_ENV is set, return it's value, otherwise return an empty
     * string.
     * @returns The value of the environment variable NODE_ENV.
     */
    protected get nodeEnv (): string {
        return this.getEnvironment( 'NODE_ENV' )?.trim() || ''
    }

    /**
     * It takes a string and returns a string.
     * @param {string} path - string - the path to the environment file
     * @returns A string that is the path to the environment file.
     */
    protected createPathEnv ( path: string ): string {
        const arrEnv: string[] = [ 'env' ]
        if ( path.length ) {
            const stringToArray: string[] = path.split( '.' )
            arrEnv.unshift( ...stringToArray )
        }
        return `.${ arrEnv.join( '.' ) }`
    }

    /**
     * It returns a promise that resolves to a DataSource object
     * @returns A promise of a DataSource object.
     */
    protected get dbConnection (): Promise<DataSource> {
        return AppDataSource.initialize()
    }
}