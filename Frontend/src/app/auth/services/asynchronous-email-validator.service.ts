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
export class AsynchronousEmailValidatorService implements AsyncValidator {

    private _baseURL = `${ environment.baseURLAuth }`

    constructor (
        private readonly _http: HttpClient,
        private readonly _internalError: InternalServerErrorService
    ) { }

    /**
     * We're using the valueChanges observable to listen for changes in the form control. We're using
     * debounceTime to wait for a second before we make the request to the server. We're using
     * switchMap to cancel the previous request if the user types something else before the request is
     * completed. We're using map to map the response from the server to a validation error object.
     * We're using first to complete the observable
     * @param control - AbstractControl<unknown, unknown>
     * @returns Observable<ValidationErrors | null>
     */
    validate ( control: AbstractControl<unknown, unknown> ): Observable<ValidationErrors | null> | Promise<ValidationErrors | null> {
        return control.valueChanges
            .pipe(
                debounceTime( 1000 ),
                switchMap( value => this._validateUniqueEmail( value ) ),
                map( ( unique: boolean ) => ( unique ) ? null : { emailIsUsed: true } ),
                first()
            )
    }

    /**
     * It makes a GET request to the server, and if the server responds with a 200 status code, it
     * returns true, otherwise it returns false
     * @param {unknown} email - unknown - The email address that the user has entered.
     * @returns An observable of a boolean.
     */
    private _validateUniqueEmail ( email: unknown ): Observable<boolean> {
        return this._http.get<IAsyncValidatorsResponse>( `${ this._baseURL }/validate?email=${ email }` )
            .pipe(
                map( res => ( res.data.isUnique ) ),
                catchError( () => {
                    this._internalError.reportInternalServerError()
                    return of( false )
                } )
            )
    }
}