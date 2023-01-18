import { HttpResponse } from "../shared/response/http.response"

/** 
 * It's a base class for controllers that provides a constructor that takes 
 * a service class and an optional HttpResponse class 
 * 
 * @class
 * @author Carlos Páez
 */
export class BaseController<T> {
    protected readonly _service: T

    constructor ( TService: { new(): T }, protected readonly _httpResponse: HttpResponse = new HttpResponse() ) {
        this._service = new TService()
    }
}