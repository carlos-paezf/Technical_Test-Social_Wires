import { Injectable } from '@angular/core'
import jwtDecode from 'jwt-decode'

import { IAccessToken } from '../interfaces/access-token.interface'


@Injectable( {
    providedIn: 'root'
} )
export class AccessTokenService {
    private _accessToken!: string

    /**
     * It sets the token
     * @param {string} accessToken - The token that you want to set.
     */
    protected _setAccessToken ( accessToken: string ) {
        this._accessToken = accessToken
        localStorage.setItem( 'accessToken', accessToken )
    }

    /**
     * It removes the access token from local storage
     */
    protected _removeAccessToken () {
        localStorage.removeItem( 'accessToken' )
        localStorage.clear()
    }

    /**
     * The function returns the value of the private variable _token
     * @returns The token property is being returned.
     */
    public get accessToken (): string {
        this._accessToken = localStorage.getItem( 'accessToken' ) ?? ''
        return this._accessToken
    }

    /**
     * It takes the access token from the local storage and decodes it using the jwtDecode function
     * from the jwt-decode library
     * @returns The decoded access token.
     */
    public get decodeAccessToken (): IAccessToken {
        return jwtDecode( this.accessToken )
    }
}