import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm"

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number
  @Column('varchar')
  username: string
  @Column('varchar')
  passwordDigest: string
  @CreateDateColumn()
  createdAt: Date
  @UpdateDateColumn()
  updatedAt: Date
}
