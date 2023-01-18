import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"
import { BaseDTO } from "../config"
import { IUser } from "../interfaces"


/**
 * @class
 * @extends BaseDTO
 * @implements {IUser}
 * @author Carlos Páez
 */
export class UserDTO extends BaseDTO implements IUser {
    @IsNotEmpty()
    @IsString()
    @MinLength( 6 )
    @MaxLength( 15 )
    username!: string

    @IsNotEmpty()
    @IsString()
    fullName!: string

    @IsNotEmpty()
    @IsEmail()
    email!: string

    @IsNotEmpty()
    @MinLength( 6 )
    password!: string
}