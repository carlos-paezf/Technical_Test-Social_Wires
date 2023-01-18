import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { catchError, map, Observable, of, tap } from 'rxjs'

import { AccessTokenService } from 'src/app/shared/services'
import { environment } from 'src/environments/environment'
import { IAuthResponse, IRegisterUser } from '../interfaces'


@Injectable( {
    providedIn: 'root'
} )
export class AuthService extends AccessTokenService {
    private _baseURL = `${ environment.baseURLAuth }`

    constructor ( private readonly _http: HttpClient ) {
        super()
    }

    /**
     * We're sending a POST request to the server with the user's email or username and password. If
     * the server responds with a status of 200, we're storing the access token in
     * local storage
     * @param {string} emailOrUsername - string, password: string
     * @param {string} password - string - The password of the user
     * @returns Observable<boolean>
     */
    public login ( emailOrUsername: string, password: string ): Observable<boolean> {
        const url = `${ this._baseURL }/login`
        const body = { emailOrUsername, password }

        return this._http.post<IAuthResponse>( url, body )
            .pipe(
                tap( res => {
                    if ( res.status === 200 ) {
                        this._setAccessToken( res.data.accessToken )
                    }
                } ),
                map( res => ( res.status === 200 ) ),
                catchError( ( { error } ) => of( error ) )
            )
    }

    /**
     * It takes in a user's registration data, sends it to the server, and returns an observable that
     * emits a boolean value indicating whether the registration was successful or not
     * @param {IRegisterUser} data - IRegisterUser - this is the data that we're sending to the server.
     * @returns Observable<unknown>
     */
    public register ( data: IRegisterUser ): Observable<unknown> {
        const url = `${ this._baseURL }/register`
        const body: IRegisterUser = { ...data }

        return this._http.post<IAuthResponse>( url, body )
            .pipe(
                tap( res => {
                    if ( res.status === 201 ) {
                        this._setAccessToken( res.data.accessToken )
                    }
                } ),
                map( res => ( res.status === 201 ) ),
                catchError( ( { error } ) => of( error ) )
            )
    }

    /**
     * It removes the access token from local storage
     */
    public logout (): void {
        this._removeAccessToken()
    }

    /**
     * We're sending a GET request to the server with the access token in the header. If the server
     * responds with a 200 status code, we return true. If the server responds with anything else, we
     * log the user out and return false
     * @returns Observable<boolean>
     */
    public validateAndRenewToken (): Observable<boolean> {
        const url = `${ this._baseURL }/renew-token`
        const headers = new HttpHeaders()
            .set( 'Authorization', `Bearer ${ this.accessToken }` )

        return this._http.get<IAuthResponse>( url, { headers } )
            .pipe(
                map( res => {
                    if ( res.status === 200 ) {
                        this._setAccessToken( res.data.accessToken )
                        return true
                    }
                    return false
                } ),
                catchError( error => {
                    this.logout()
                    return of( error.ok )
                } )
            )
    }
}