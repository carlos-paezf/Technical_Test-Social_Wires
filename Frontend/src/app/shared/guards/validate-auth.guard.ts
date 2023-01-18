import { Injectable } from '@angular/core'
import { CanActivate, CanLoad, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { AccessTokenService } from '../services'


@Injectable( {
    providedIn: 'root'
} )
export class ValidateAuthGuard implements CanActivate, CanLoad {
    constructor ( private _router: Router, private _accessTokenService: AccessTokenService ) { }

    /**
     * If the access token is empty, return true
     * @returns Observable<boolean> | boolean
     */
    canActivate (): Observable<boolean> | boolean {
        return this._accessTokenService.accessToken === ''
    }

    /**
     * If the access token is empty, return true, otherwise navigate to the home page and return false
     * @returns Observable<boolean> | boolean
     */
    canLoad (): Observable<boolean> | boolean {
        if ( this._accessTokenService.accessToken === '' ) return true

        this._router.navigateByUrl( '/' )
        return false
    }
}
