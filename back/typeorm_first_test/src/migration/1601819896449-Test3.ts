import {MigrationInterface, QueryRunner, Table, TableIndex, TableColumn, TableForeignKey } from "typeorm";

export class Test21601818362192 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: "question",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true
          },
          {
            name: "name",
            type: "varchar"
          }
        ]
      }),true)

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("question");
    }

}