import { Injectable, EventEmitter, Output } from '@angular/core'


@Injectable( {
    providedIn: 'root'
} )
export class InternalServerErrorService {

    @Output() internalServerErrorEmitter = new EventEmitter<boolean>();

    /**
     * The function emits an event that is listened to by the parent component
     */
    reportInternalServerError () {
        this.internalServerErrorEmitter.emit( true )
    }
}