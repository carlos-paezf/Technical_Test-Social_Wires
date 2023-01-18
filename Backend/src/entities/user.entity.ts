import { Exclude } from 'class-transformer'
import { Column, Entity, OneToMany } from 'typeorm'
import { BaseEntity } from '../config/base.entity'
import { IUser } from '../interfaces'
import { PostEntity } from './post.entity'


/** 
 * The `UserEntity` class is a TypeScript class that extends the BaseEntity class. 
 * It has a bunch of properties, some of which are decorated with `@Column`, `@Exclude`, and `@OneToMany`.
 * 
 * @class
 * @extends BaseEntity
 * @implements {IUser}
 * @author Carlos Páez
 */
@Entity( { name: 'users' } )
export class UserEntity extends BaseEntity implements IUser {
    @Column( { unique: true, length: 15 } )
    username!: string

    @Column()
    fullName!: string

    @Column( { unique: true } )
    email!: string

    @Exclude()
    @Column( { select: false } )
    password!: string

    @OneToMany( () => PostEntity, ( post ) => post.author )
    posts!: PostEntity[]
}