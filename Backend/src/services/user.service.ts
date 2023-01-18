import { UpdateResult } from "typeorm"
import { BaseService } from "../config"
import { UserDTO, UserUpdateDTO } from "../dtos"
import { UserEntity } from "../entities"
import { PasswordEncrypter } from "../helpers/password-encrypter.helper"


/**
 * This class is a service class that extends the `BaseService` class 
 * and uses the `UserEntity` class to perform CRUD operations on the 
 * `User` table in the database 
 * @class
 * @extends BaseService<UserEntity>
 * @author Carlos Páez
 */
export class UserService extends BaseService<UserEntity> {
    constructor () {
        super( UserEntity )
    }

    /**
     * It returns a promise of an array of UserEntity objects and a number
     * @param {number} from - number - The number of records to skip.
     * @param {number} limit - number - The number of users to return
     * @param [all=false] - boolean - if true, it will return all users, including deleted ones.
     * @param [order=ASC] - { username: ( order === 'ASC' ) ? 'ASC' : 'DESC' }
     * @returns An array of UserEntity and a number.
     */
    public async findUsers ( from: number, limit: number, all = false, order = 'ASC' ): Promise<[ UserEntity[], number ]> {
        return ( await this.execRepository ).findAndCount( {
            skip: from,
            take: limit,
            order: { username: ( order === 'ASC' ) ? 'ASC' : 'DESC' },
            select: { password: false },
            withDeleted: all
        } )
    }

    /**
     * Find one user by id
     * @param {string} id - string
     * @returns The user entity
     */
    public async findOneUserById ( id: string ): Promise<UserEntity | null> {
        return ( await this.execRepository ).findOne( {
            where: { id },
        } )
    }

    /**
     * Find a user by email, and return the user's password.
     * @param {string} email - string - the email of the user
     * @returns A UserEntity object with the password property.
     */
    public async findUserByEmail ( email: string ): Promise<UserEntity | null> {
        return ( await this.execRepository )
            .createQueryBuilder( "user" )
            .where( "LOWER(user.email) = LOWER(:email)", { email } )
            .addSelect( "user.password" )
            .getOne()
    }

    /**
     * Find a user by username, and return the user's password.
     * @param {string} username - string
     * @returns A UserEntity object with the password property.
    */
    public async findUserByUsername ( username: string ): Promise<UserEntity | null> {
        return ( await this.execRepository )
            .createQueryBuilder( "user" )
            .where( "LOWER(user.username) = LOWER(:username)", { username } )
            .addSelect( "user.password" )
            .getOne()
    }

    /**
     * It creates a new user, encrypts the password, and saves the user to the database.
     * @param {UserDTO} body - UserDTO
     * @returns The user that was created.
     */
    public async createUser ( body: UserDTO ): Promise<UserEntity> {
        const newUser = ( await this.execRepository ).create( body )
        const passwordHash = await PasswordEncrypter.encrypt( newUser.password )
        newUser.password = passwordHash
        return ( await this.execRepository ).save( newUser )
    }

    /**
     * It updates a user in the database.
     * @param {string} id - string - The id of the user you want to update
     * @param {UserUpdateDTO} body - UserUpdateDTO
     * @returns UpdateResult
     */
    public async updateUser ( id: string, body: UserUpdateDTO ): Promise<UpdateResult> {
        return ( await this.execRepository ).update( id, { ...body, updatedAt: new Date() } )
    }
}