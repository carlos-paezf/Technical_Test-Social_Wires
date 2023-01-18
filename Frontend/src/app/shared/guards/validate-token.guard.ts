import { Injectable } from '@angular/core'
import { CanActivate, CanLoad, Router } from '@angular/router'
import { Observable, tap } from 'rxjs'

import { AuthService } from '../../auth/services'


@Injectable( {
    providedIn: 'root'
} )
export class ValidateTokenGuard implements CanActivate, CanLoad {

    constructor ( private _router: Router, private _authService: AuthService ) { }

    /**
     * If the user is not logged in, redirect them to the login page
     * @returns Observable<boolean>
     */
    canActivate (): Observable<boolean> | boolean {
        return this._authService.validateAndRenewToken()
            .pipe(
                tap( valid => {
                    !valid && this._router.navigateByUrl( '/auth' )
                } )
            )
    }

    /**
     * If the user is not logged in, redirect them to the login page
     * @returns Observable<boolean>
     */
    canLoad (): Observable<boolean> | boolean {
        return this._authService.validateAndRenewToken()
            .pipe(
                tap( valid => {
                    !valid && this._router.navigateByUrl( '/auth' )
                } )
            )
    }
}