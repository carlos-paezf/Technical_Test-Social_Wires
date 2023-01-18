
import { IBaseResponse } from "src/app/shared/interfaces"


export interface IAuthResponse extends IBaseResponse {
    data: {
        accessToken: string
    }
}


export interface IAsyncValidatorsResponse extends IBaseResponse {
    data: {
        isUnique: boolean
    }
}