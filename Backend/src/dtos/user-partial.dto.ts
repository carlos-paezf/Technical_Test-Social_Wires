import { IsOptional, IsString, IsEmail, MaxLength, MinLength } from 'class-validator'
import { BaseDTO } from '../config'
import { IUser } from "../interfaces"


export class UserPartialDTO extends BaseDTO implements Partial<IUser> {
    @IsOptional()
    @IsString()
    @MinLength( 6 )
    @MaxLength( 15 )
    username?: string

    @IsOptional()
    @IsString()
    fullName?: string

    @IsOptional()
    @IsEmail()
    email?: string

    @IsOptional()
    @MinLength( 6 )
    password?: string
}