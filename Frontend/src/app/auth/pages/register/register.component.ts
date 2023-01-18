import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'

import { InternalServerErrorService, ToastrNotificationService } from 'src/app/shared/services'
import { CustomValidators } from '../../classes'
import { AsynchronousEmailValidatorService, AsynchronousUsernameValidatorService, AuthService, CustomValidatorService } from '../../services'


@Component( {
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: [ './register.component.scss' ]
} )
export class RegisterComponent extends CustomValidators implements OnInit {

    private _emailPattern = new RegExp( `^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$` )
    public colorError: string
    public basicData: boolean
    public loginData: boolean
    public internalServerError: boolean


    constructor (
        private readonly _formBuilder: FormBuilder,
        private readonly _router: Router,
        private readonly _toastr: ToastrNotificationService,
        private readonly _authService: AuthService,
        private readonly _internalError: InternalServerErrorService,
        private readonly _customValidator: CustomValidatorService,
        private readonly _emailValidator: AsynchronousEmailValidatorService,
        private readonly _usernameValidator: AsynchronousUsernameValidatorService
    ) {
        super()
        this.colorError = `red`
        this.basicData = true
        this.loginData = false
        this.internalServerError = false
    }


    public registerForm = this._formBuilder.group( {
        username: [ '', [ Validators.required, Validators.minLength( 6 ), Validators.maxLength( 15 ) ], [ this._usernameValidator ] ],
        fullName: [ '', [ Validators.required ] ],
        email: [ '', [ Validators.required, Validators.pattern( this._emailPattern ) ], [ this._emailValidator ] ],
        password: [ '', [
            Validators.required, Validators.minLength( 6 ),
            this._customValidator.patternValidator( /\d/, { hasNumber: true } ),
            this._customValidator.patternValidator( /[A-Z]/, { hasCapitalCase: true } ),
            this._customValidator.patternValidator( /[a-z]/, { hasSmallCase: true } ),
            this._customValidator.patternValidator( /[@$¿?¡!()[\]*/+\-_{}#%&=^]/, { hasSpecialCharacterCase: true } )
        ] ],
        confirmPassword: [ '', [ Validators.required, this._customValidator.passwordMatchValidator ] ],
    }, {
        validators: [ this._customValidator.passwordMatchValidator( 'password', 'confirmPassword' ) ],
    } )


    ngOnInit (): void {
        this.registerForm.reset()
    }

    /**
     * It returns an error message if the form is not filled out.
     * @returns The invalidFields method is being returned.
     */
    get invalidFields () {
        return this._toastr.error(
            `Completa todos los campos del formulario`,
            `Error de envío`
        )
    }


    /**
     * If the form is invalid, mark all fields as touched and return the invalidFields array.
     * Otherwise, create a new user object, and send it to the auth service. If the response is true,
     * navigate to the dashboard. If the response is undefined, navigate to the 500 page. Otherwise,
     * return the invalidFields array
     * @returns the result of the subscribe function.
     */
    public register () {
        if ( this.registerForm.invalid ) {
            this.registerForm.markAllAsTouched()
            return this.invalidFields
        }

        const newUser = {
            username: String( this.registerForm.controls[ 'username' ]?.value ),
            fullName: String( this.registerForm.controls[ 'fullName' ]?.value ),
            email: String( this.registerForm.controls[ 'email' ]?.value ),
            password: String( this.registerForm.controls[ 'password' ]?.value )
        }

        return this._authService.register( newUser )
            .subscribe( ( res ) => {
                if ( res === true ) {
                    return this._router.navigateByUrl( `/dashboard` )
                } else {
                    if ( res !== undefined ) {
                        return this.invalidFields
                    } else {
                        return this._internalError.reportInternalServerError()
                    }
                }
            } )
    }

    /**
     * If the lastName field is required, return the error message, otherwise return an empty string
     * @returns The error message for the lastName field.
     */
    get fullNameError (): string {
        return ( this.registerForm.get( 'fullName' )?.getError( 'required' ) )
            ? `Debe ingresar su nombre(s) y apellido(s)` : ``
    }

    /**
     * If the username field has an error of type 'required', return the string 'Se debe ingresar un
     * nombre de usuario'. If the username field has an error of type 'minlength', return the string
     * 'El nombre de usuario debe tener mínimo 6 caracteres'. If the username field has an error of
     * type 'maxlength', return the string 'El nombre de usuario no debe tener más de 15 caracteres'.
     * If the username field has an error of type 'usernameIsUsed', return the string 'El nombre de
     * usuario ya está en uso'. If none of the above conditions are met, return an empty string
     * @returns The error message that is being returned is the one that is being returned by the
     * backend.
     */
    get usernameError (): string {
        const username = this.registerForm.get( 'username' )
        if ( username?.getError( 'required' ) ) {
            return `Se debe ingresar un nombre de usuario`
        } else if ( username?.getError( 'minlength' ) ) {
            return `El nombre de usuario debe tener mínimo 6 caracteres`
        } else if ( username?.getError( 'maxlength' ) ) {
            return `El nombre de usuario no debe tener más de 15 caracteres`
        } else if ( username?.getError( 'usernameIsUsed' ) ) {
            return `El nombre de usuario ya está en uso`
        }
        return ``
    }

    /**
     * If the email field has an error of type 'required', return the string 'Se debe ingresar un
     * correo electronico', otherwise if the email field has an error of type 'pattern', return the
     * string 'Se debe ingresar un formato de correo válido', otherwise if the email field has an error
     * of type 'emailIsUsed', return the string 'El correo electrónico ya está en uso', otherwise
     * return an empty string
     * @returns The error message that is being returned is the one that is being returned by the
     * server.
     */
    get emailError (): string {
        const email = this.registerForm.get( 'email' )
        if ( email?.getError( 'required' ) ) {
            return `Se debe ingresar un correo electronico`
        } else if ( email?.getError( 'pattern' ) ) {
            return `Se debe ingresar un formato de correo válido`
        } else if ( email?.getError( 'emailIsUsed' ) ) {
            return `El correo electrónico ya está en uso`
        }
        return ``
    }

    /**
     * It returns a string that is the error message for the password field of the form
     * @returns The error message that is being returned is the one that is being validated by the
     * form.
     */
    get passwordError (): string {
        const password = this.registerForm.get( 'password' )
        if ( password?.getError( 'required' ) ) {
            return `Se debe ingresar una contraseña`
        } else if ( password?.getError( 'minlength' ) ) {
            return `La contraseña debe tener al menos 6 caracteres`
        } else if ( password?.getError( 'hasNumber' ) ) {
            return `La contraseña debe tener al menos un número`
        } else if ( password?.getError( 'hasCapitalCase' ) ) {
            return `La contraseña debe tener al menos una mayúscula`
        } else if ( password?.getError( 'hasSmallCase' ) ) {
            return `La contraseña debe tener al menos una minúscula`
        } else if ( password?.getError( 'hasSpecialCharacterCase' ) ) {
            return `La contraseña debe tener al menos un carácter especial`
        }
        return ``
    }

    /**
     * If the confirmPassword field has an error of type noPasswordMatch, return the error message,
     * otherwise return an empty string
     * @returns The error message that is being returned is the one that is being set in the validator.
     */
    get confirmPasswordError (): string {
        return ( this.registerForm.get( 'confirmPassword' )?.getError( 'noPasswordMatch' ) )
            ? `Las contraseñas ingresadas no coinciden` : ``
    }
}