import {MigrationInterface, QueryRunner, Table} from "typeorm"

export class CreateComments1688608482426 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.createTable(new Table({
      name: 'comments',
      columns: [
        {name: 'id', isGenerated: true, type: 'int', generationStrategy: 'increment', isPrimary: true},
        {name: 'content', type: 'text'},
        {name: 'userId', type: 'int'},
        {name: 'postId', type: 'int'},
        {name: 'createdAt', type: 'time', isNullable: false, default: 'now()'},
        {name: 'updatedAt', type: 'time', isNullable: false, default: 'now()'}
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.dropTable('comments')
  }

}
