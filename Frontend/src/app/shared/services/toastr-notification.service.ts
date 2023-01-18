import { Injectable } from '@angular/core'
import { ToastrService } from 'ngx-toastr'


@Injectable( {
    providedIn: 'root'
} )
export class ToastrNotificationService {

    public params = {
        enableHtml: true,
        progressBar: true,
        positionClass: `toast-top-right`,
        timeOut: 8000,
        showProgressBar: true,
        pauseOnHover: true,
        pauseOnFocusLoss: true,
        closeButton: true,
        width: '1000px'
    }

    constructor ( private _toastr: ToastrService ) { }

    /**
     * A function that is used to display a success message.
     * @param {string} message - The message you want to display in the toast.
     * @param {string} title - The title of the toast
     * @param params
     */
    public success ( message: string, title: string, params = this.params ): void {
        this._toastr.success( message, title, params )
    }

    /**
     * A function that displays an error message.
     * @param {string} message - The message to be displayed
     * @param {string} title - The title of the toastr message
     * @param params
     */
    public error ( message: string, title: string, params = this.params ): void {
        this._toastr.error( message, title, params )
    }

    /**
     * A function that is used to display a toastr message.
     * @param {string} message - The message you want to display in the toast.
     * @param {string} title - The title of the toastr message
     * @param params
     */
    public info ( message: string, title: string, params = this.params ): void {
        this._toastr.info( message, title, params )
    }

    /**
     * It creates a warning toastr message.
     * @param {string} message - The message to be displayed
     * @param {string} title - The title of the toastr message
     * @param params
     */
    public warning ( message: string, title: string, params = this.params ): void {
        this._toastr.warning( message, title, params )
    }
}