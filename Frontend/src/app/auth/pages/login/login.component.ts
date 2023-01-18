import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'

import { InternalServerErrorService, ToastrNotificationService } from '../../../shared/services'
import { CustomValidators } from '../../classes'
import { AuthService } from '../../services'


@Component( {
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.scss' ]
} )
export class LoginComponent extends CustomValidators implements OnInit {

    public colorError: string

    constructor (
        private readonly _formBuilder: FormBuilder,
        private readonly _router: Router,
        private readonly _authService: AuthService,
        private readonly _toastr: ToastrNotificationService,
        private _internalError: InternalServerErrorService
    ) {
        super()
        this.colorError = 'red'
    }


    public loginForm: FormGroup = this._formBuilder.group( {
        emailOrUsername: [ '', [ Validators.required, Validators.minLength( 6 ) ] ],
        password: [ '', [ Validators.required, Validators.minLength( 6 ) ] ]
    } )


    ngOnInit (): void {
        this.loginForm.reset()
    }

    /**
     * It returns an error message if the user enters invalid credentials.
     * @returns A toastr message
     */
    get invalidCredentials () {
        return this._toastr.error(
            `Usuario/Correo o Contraseña invalida`,
            `Error de autenticación`
        )
    }


    /**
     * If the form is invalid, mark all the fields as touched and return the invalidCredentials error
     * message. If the form is valid, get the emailOrUsername and password values from the form, call
     * the login function from the auth service, and subscribe to the response. If the response is
     * true, navigate to the dashboard. If the response is not true, but is not undefined, return the
     * invalidCredentials error message. If the response is undefined, navigate to the 500 error page
     * @returns The login function is returning the result of the subscribe function.
     */
    public login () {
        if ( this.loginForm.invalid ) {
            this.loginForm.markAllAsTouched()
            return this.invalidCredentials
        }

        const { emailOrUsername, password } = this.loginForm.value

        this._authService.login( emailOrUsername, password )
            .subscribe( ( res ) => {
                if ( res === true ) {
                    return this._router.navigateByUrl( `/dashboard` )
                } else {
                    if ( res !== undefined ) {
                        return this.invalidCredentials
                    } else {
                        return this._internalError.reportInternalServerError()
                    }
                }
            } )
    }

    /**
     * If the emailOrUsername field has a required error, return a string with the error message,
     * otherwise if the emailOrUsername field has a minlength error, return a string with the error
     * message, otherwise return an empty string
     * @returns The error message that will be displayed in the template.
     */
    get emailOrUsernameError (): string {
        const emailOrUsername = this.loginForm.get( 'emailOrUsername' )
        if ( emailOrUsername?.getError( 'required' ) ) {
            return `Se debe ingresar con un correo o nombre de usuario`
        } else if ( emailOrUsername?.getError( 'minlength' ) ) {
            return `El correo o nombre de usuario deben tener mínimo 6 caracteres`
        }
        return ``
    }

    /**
     * If the password field is empty, return a message saying that the password is required. If the
     * password field is not empty, but the password is less than 6 characters, return a message saying
     * that the password must be at least 6 characters. If neither of these conditions are true, return
     * an empty string
     * @returns The passwordError is being returned.
     */
    get passwordError (): string {
        const password = this.loginForm.get( 'password' )
        if ( password?.getError( 'required' ) ) {
            return `Se debe ingresar con un contraseña`
        } else if ( password?.getError( 'minlength' ) ) {
            return `La contraseña debe tener mínimo 6 caracteres`
        }
        return ``
    }

}
