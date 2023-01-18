import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"


/**
 * This is a base class that will be extended by all other entities. 
 * It will contain the `id`, `createdAt`, and `updatedAt` fields. 
 * @class
 * @abstract
 * @author Carlos Páez
 */
export abstract class BaseEntity {
    @PrimaryGeneratedColumn( "uuid" )
    id!: string

    @CreateDateColumn( {
        name: "created_at",
        type: "timestamp"
    } )
    createdAt!: Date

    @UpdateDateColumn( {
        name: "updated_at",
        type: "timestamp"
    } )
    updatedAt!: Date

    @DeleteDateColumn( {
        name: "deleted_at",
        type: "timestamp"
    } )
    deletedAt?: Date
}