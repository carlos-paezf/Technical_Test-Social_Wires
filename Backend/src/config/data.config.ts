import { DataSource, DataSourceOptions } from "typeorm"
import * as dotenv from 'dotenv'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'


/* Loading the environment variables from the .env file. */
dotenv.config( {
    path: process.env.NODE_ENV !== undefined ? `.${ process.env.NODE_ENV.trim() }.env` : '.env'
} )


/**
 * A configuration object for the database. 
 */
const Config: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number( process.env.DB_PORT ),
    database: process.env.DB_DATABASE,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    entities: [ __dirname + "/../models/*.entity(.ts,.js)" ],
    migrations: [ __dirname + "/../migrations/*(.ts,.js)" ],
    synchronize: false,
    migrationsRun: true,
    logging: false,
    namingStrategy: new SnakeNamingStrategy()
}


/**
 * Creating a new instance of the DataSource class and passing in the Config object.
 */
export const AppDataSource: DataSource = new DataSource( Config )