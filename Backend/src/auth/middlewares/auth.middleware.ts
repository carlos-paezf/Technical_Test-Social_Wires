import { HttpResponse } from "../../shared/response/http.response"
import { AuthService } from "../services/auth.service"


export class AuthMiddleware {
    protected readonly _service: AuthService

    constructor ( protected readonly httpResponse: HttpResponse = new HttpResponse() ) {
        this._service = new AuthService()
    }
}