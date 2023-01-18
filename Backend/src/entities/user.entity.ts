import { Exclude } from 'class-transformer'
import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../config/base.entity'
import { IUser } from '../interfaces'


/** 
 * The `UserEntity` class is a TypeScript class that extends the BaseEntity class. 
 * It has a bunch of properties, some of which are decorated with `@Column`, `@Exclude`, `@ManyToOne`, and `@JoinColumn`.
 * 
 * @class
 * @extends BaseEntity
 * @implements {IUser}
 * @author Carlos Páez
 */
@Entity( { name: 'user' } )
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
}