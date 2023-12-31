import {MigrationInterface, QueryRunner, Table} from "typeorm"

export class CreatePosts1688608173903 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.createTable(new Table({
      name: 'posts',
      columns: [
        { name: 'id', isGenerated: true, type: 'int', generationStrategy: 'increment', isPrimary: true },
        { name: 'title', type:'varchar' },
        { name: 'content', type:'text' },
        { name: 'authorId', type:'int' },
        { name: 'createdAt', type: 'timestamp', isNullable: false, default:'now()' },
        { name: 'updatedAt', type: 'timestamp', isNullable: false, default:'now()' }
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.dropTable('posts')
  }

}
