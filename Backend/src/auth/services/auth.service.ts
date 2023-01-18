import { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { ConfigServer } from "../../config"
import { UserEntity } from '../../entities'
import { ITokenPayload } from '../../interfaces'
import { UserService } from "../../services"


export class AuthService extends ConfigServer {
    constructor ( protected readonly _service: UserService = new UserService(), private readonly _jwtInstance = jwt ) {
        super()
    }

    /**
     * If the user exists, compare the password to the hash, and if it matches, return the user.
     * @param {string} emailOrUsername - string - The email or username of the user
     * @param {string} password - string - The password to validate
     * @returns The return type is a Promise of UserEntity or null.
     */
    public async validateUser ( emailOrUsername: string, password: string ): Promise<UserEntity | null> {
        const userByEmail = await this._service.findUserByEmail( emailOrUsername )
        const userByUsername = await this._service.findUserByUsername( emailOrUsername )

        if ( userByEmail ) {
            const isMatch = await compare( password, userByEmail.password )
            if ( isMatch ) return userByEmail
        }

        if ( userByUsername ) {
            const isMatch = await compare( password, userByUsername.password )
            if ( isMatch ) return userByUsername
        }

        return null
    }

    /**
     * This function takes a payload and a secret and returns a signed JWT.
     * @param payload - The payload to be signed.
     * @param {string} secret - The secret key used to sign the token.
     * @returns A JWT token
     */
    private _sign (
        payload: jwt.JwtPayload,
        secret: string,
        options: jwt.SignOptions = {
            expiresIn: `3h`,
            algorithm: 'HS256'
        } ): string {
        return this._jwtInstance.sign( payload, secret, options )
    }

    /**
     * It takes a user object, finds the user in the database, and then returns a JWT token
     * @param {UserEntity} user - UserEntity - this is the user object that is returned from the
     * database.
     * @returns An object with two properties: accessToken and user.
     */
    public async generateJWT ( userId: string ): Promise<{ accessToken: string, user: UserEntity } | null> {
        const user = await this._service.findOneUserById( userId )

        if ( !user ) return null
        else user.password = 'Not Permission'

        const payload: ITokenPayload = {
            id: user.id,
            username: user.username,
            email: user.email,
            fullName: user.fullName
        }

        return {
            accessToken: this._sign( payload, this.getEnvironment( `JWT_SECRET_KEY` )! ),
            user
        }
    }

    /**
     * It takes a token, verifies it, and returns a promise that resolves to the decoded token payload
     * @param {string} token - The token to verify
     * @returns The decoded token payload.
     */
    public verifyJWT ( token: string ): Promise<ITokenPayload> {
        const verifyOptions: jwt.VerifyOptions = {
            algorithms: [ 'HS256' ],
        }

        return new Promise( ( resolve, reject ) => {
            jwt.verify(
                token,
                this.getEnvironment( `JWT_SECRET_KEY` )!,
                verifyOptions,
                ( error, decoded ) => {
                    return ( error ) ? reject( error ) : resolve( decoded as ITokenPayload )
                }
            )
        } )
    }
}