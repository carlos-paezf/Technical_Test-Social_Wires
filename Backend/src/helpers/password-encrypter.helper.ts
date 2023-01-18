import bcrypt from 'bcrypt'


/**
 * It takes a string, generates a salt, and then encrypts the string using the salt 
 * @class
 * @author Carlos Páez
 */
export class PasswordEncrypter {
    /**
     * This function takes a string, generates a salt, and then encrypts the string using the salt.
     * @param {string} password - The password to be encrypted.
     * @returns The encrypted password
     */
    static async encrypt ( password: string ): Promise<string> {
        const salt = bcrypt.genSaltSync( 10 )
        const encriptedPassword = await bcrypt.hash( password, salt )
        return encriptedPassword
    }
}