import { IsOptional, IsString, IsEmail, MaxLength, MinLength } from 'class-validator'
import { IUser } from "../interfaces"


export class UserUpdateDTO implements Partial<IUser> {
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