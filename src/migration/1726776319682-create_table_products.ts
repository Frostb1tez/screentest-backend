import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableProducts1726776319682 implements MigrationInterface {
    name = 'createTableProducts1726776319682'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "sku" character varying NOT NULL, "price" numeric NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_c44ac33a05b144dd0d9ddcf9327" UNIQUE ("sku"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."product_translations_language_enum" AS ENUM('en', 'th')`);
        await queryRunner.query(`CREATE TABLE "product_translations" ("id" SERIAL NOT NULL, "language" "public"."product_translations_language_enum" NOT NULL, "name" character varying NOT NULL, "description" text NOT NULL, "product_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_38feaa5884a6a0171d067cc9d15" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product_translations" ADD CONSTRAINT "FK_1b7b07c6049367c6446c5ac5605" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_translations" DROP CONSTRAINT "FK_1b7b07c6049367c6446c5ac5605"`);
        await queryRunner.query(`DROP TABLE "product_translations"`);
        await queryRunner.query(`DROP TYPE "public"."product_translations_language_enum"`);
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
