import { IsNotEmpty } from 'class-validator'
import { BaseDTO } from "../config"
import { UserEntity } from '../entities'
import { IPost } from "../interfaces"


/**
 * @class
 * @extends BaseDTO
 * @implements {IPost}
 * @author Carlos Páez
 */
export class PostDTO extends BaseDTO implements IPost {
    @IsNotEmpty()
    title!: string

    @IsNotEmpty()
    content!: string

    @IsNotEmpty()
    author!: UserEntity
}