import { Directive, ElementRef, Input, OnInit } from '@angular/core'


/** 
 * The ErrorMsgDirective class is a directive that sets 
 * the color, message, and visibility of an HTML element 
 * 
 * @author Carlos Páez
 */
@Directive( {
    selector: '[error-msg]'
} )
export class ErrorMsgDirective implements OnInit {
    private _color = 'red'
    private _message = 'Campo Invalido'
    private _invalid = true

    private _htmlElement: ElementRef<HTMLElement>

    constructor ( private _elementRef: ElementRef<HTMLElement> ) {
        this._htmlElement = this._elementRef
    }

    ngOnInit (): void {
        this._setColor()
        this._setMessage()
        this._setValid()
    }

    /**
     * A setter that is called when the value of the color input is changed. 
     * The color function sets the color of the text in the element
     * @param {string} color - The color of the text.
     */
    @Input() set color ( color: string ) {
        this._color = color
        this._setColor()
    }

    /**
     * A setter that is called when the value of the message input is changed. 
     * The message function sets the message of the text in the element
     * @param {string} message - The message of the text.
     */
    @Input() set message ( message: string ) {
        this._message = message
        this._setMessage()
    }

    /**
     * It sets the _invalid property to the value of the valid parameter.
     * @param {boolean} valid - boolean - This is the boolean value that determines whether the input
     * is valid or not.
     */
    @Input() set invalid ( valid: boolean ) {
        this._invalid = valid
        this._setValid()
    }

    /**
     * _setColor() is a private function that sets the color of the HTML element to the value of the
     * private variable _color
     */
    private _setColor () {
        this._htmlElement.nativeElement.style.color = this._color
    }

    /**
     * The function sets the text content of the HTML element to the value of the private variable
     * _message
     */
    private _setMessage () {
        this._htmlElement.nativeElement.textContent = this._message
    }

    /**
     * It sets the hidden property of the html element to the opposite of the invalid property.
     */
    private _setValid () {
        this._htmlElement.nativeElement.hidden = !this._invalid
    }
}