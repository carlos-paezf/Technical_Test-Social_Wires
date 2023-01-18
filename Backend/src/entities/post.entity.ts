import { Column, Entity, Index, ManyToOne } from "typeorm"
import { BaseEntity } from "../config"
import { IPost } from "../interfaces"
import { UserEntity } from "./user.entity"


/** 
 * The `PostEntity` class is a TypeScript class that extends the BaseEntity class. 
 * It has a bunch of properties, some of which are decorated with `@Column` and `@ManyToOne`.
 * 
 * @class
 * @extends BaseEntity
 * @implements {IPost}
 * @author Carlos Páez
 */
@Entity( { name: "posts" } )
export class PostEntity extends BaseEntity implements IPost {
    @Index( { fulltext: true } )
    @Column()
    title!: string

    @Column()
    content!: string

    @ManyToOne( () => UserEntity, ( user ) => user.posts )
    author!: UserEntity
}