import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms'
import { catchError, debounceTime, first, map, Observable, of, switchMap } from 'rxjs'

import { InternalServerErrorService } from 'src/app/shared/services'
import { environment } from 'src/environments/environment'
import { IAsyncValidatorsResponse } from '../interfaces'


@Injectable( {
    providedIn: 'root'
} )
export class AsynchronousUsernameValidatorService implements AsyncValidator {

    private _baseURL = `${ environment.baseURLAuth }`

    constructor (
        private readonly _http: HttpClient,
        private readonly _internalError: InternalServerErrorService
    ) { }

    /**
     * We're using the valueChanges observable to listen for changes to the form control's value. We're
     * then using the debounceTime operator to wait for a second before we make the request to the
     * server. We're using the switchMap operator to cancel any previous requests and make a new
     * request to the server. We're using the map operator to map the response from the server to a
     * validation error object. We're using the first operator to complete the observable after the
     * first value is emitted
     * @param control - AbstractControl<unknown, unknown>
     * @returns Observable<ValidationErrors | null>
     */
    validate ( control: AbstractControl<unknown, unknown> ): Observable<ValidationErrors | null> | Promise<ValidationErrors | null> {
        return control.valueChanges
            .pipe(
                debounceTime( 1000 ),
                switchMap( value => this._validateUniqueUsername( value ) ),
                map( ( unique: boolean ) => ( unique ) ? null : { usernameIsUsed: true } ),
                first()
            )
    }

    /**
     * It makes a GET request to the server, and if the server responds with a 200 status code, it
     * returns true, otherwise it returns false
     * @param {unknown} username - unknown - This is the value of the input field.
     * @returns An observable of a boolean.
     */
    private _validateUniqueUsername ( username: unknown ): Observable<boolean> {
        return this._http.get<IAsyncValidatorsResponse>( `${ this._baseURL }/validate?username=${ username }` )
            .pipe(
                map( res => ( res.data.isUnique ) ),
                catchError( () => {
                    this._internalError.reportInternalServerError()
                    return of( false )
                } )
            )
    }
}