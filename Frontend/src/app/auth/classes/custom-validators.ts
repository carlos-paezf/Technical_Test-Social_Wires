import { AbstractControl } from "@angular/forms"

/**
 * @class
 * @author Carlos Páez
 */
export class CustomValidators {
    /**
     * It returns true if the control has errors, has been touched, and is invalid
     * @param {AbstractControl} control - AbstractControl - the form control that we want to check
     * @param {string} field - string - the name of the field you want to check
     * @returns A boolean value.
     */
    protected isInvalidField ( control: AbstractControl, field: string ): boolean {
        return Boolean(
            control.get( field )?.errors
            && control.get( field )?.touched
            && control.get( field )?.invalid
        )
    }
}