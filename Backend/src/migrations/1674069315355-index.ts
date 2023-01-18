import { MigrationInterface, QueryRunner } from "typeorm";

export class index1674069315355 implements MigrationInterface {
    name = 'index1674069315355'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_2d82eb2bb2ddd7a6bfac8804d8" ON "posts" ("title") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_2d82eb2bb2ddd7a6bfac8804d8"`);
    }

}
