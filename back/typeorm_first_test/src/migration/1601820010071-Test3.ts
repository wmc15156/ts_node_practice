import {MigrationInterface, QueryRunner} from "typeorm";

export class Test31601820010071 implements MigrationInterface {
    name = 'Test31601820010071'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `sns_uid` varchar(255) NOT NULL, `provider` varchar(255) NOT NULL, `userId` int NULL, UNIQUE INDEX `REL_d72ea127f30e21753c9e229891` (`userId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `sns_uid`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `provider`");
        await queryRunner.query("DROP INDEX `REL_d72ea127f30e21753c9e229891` ON `user`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `userId`");
        await queryRunner.query("ALTER TABLE `user` ADD `sns_uid` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `user` ADD `provider` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `user` ADD `userId` int NULL");
        await queryRunner.query("ALTER TABLE `user` ADD UNIQUE INDEX `IDX_d72ea127f30e21753c9e229891` (`userId`)");
        await queryRunner.query("ALTER TABLE `user` ADD `firstname` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `user` ADD `lastname` varchar(255) NOT NULL");
        await queryRunner.query("CREATE UNIQUE INDEX `REL_d72ea127f30e21753c9e229891` ON `user` (`userId`)");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_d72ea127f30e21753c9e229891e` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_d72ea127f30e21753c9e229891e`");
        await queryRunner.query("DROP INDEX `REL_d72ea127f30e21753c9e229891` ON `user`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `lastname`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `firstname`");
        await queryRunner.query("ALTER TABLE `user` DROP INDEX `IDX_d72ea127f30e21753c9e229891`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `userId`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `provider`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `sns_uid`");
        await queryRunner.query("ALTER TABLE `user` ADD `userId` int NULL");
        await queryRunner.query("CREATE UNIQUE INDEX `REL_d72ea127f30e21753c9e229891` ON `user` (`userId`)");
        await queryRunner.query("ALTER TABLE `user` ADD `provider` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `user` ADD `sns_uid` varchar(255) NOT NULL");
        await queryRunner.query("DROP INDEX `REL_d72ea127f30e21753c9e229891` ON `user`");
        await queryRunner.query("DROP TABLE `user`");
    }

}
