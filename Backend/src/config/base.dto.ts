import { IsDate, IsOptional, IsUUID } from "class-validator"


/**
 * It's a base class for all DTOs that have an `id`, `createdAt`, and `updatedAt`.
 * @class
 * @abstract
 * @author Carlos Páez
 */
export abstract class BaseDTO {
    @IsUUID()
    @IsOptional()
    id!: string

    @IsDate()
    @IsOptional()
    createdAt!: Date

    @IsDate()
    @IsOptional()
    updatedAt!: Date

    @IsDate()
    @IsOptional()
    deletedAt!: Date
}