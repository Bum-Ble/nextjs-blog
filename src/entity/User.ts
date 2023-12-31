import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm"
import {Post} from "./Post";
import {Comment} from "./Comment";
import {handleGetRepository} from "@/lib/handleGetRepository";
import md5 from "md5";
import _ from "lodash"

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
  @OneToMany(type => Post, post => post.author)
  posts: Post[]
  @OneToMany(type => Comment, comment => comment.user)
  comments: Comment[]


  errors = {
    username: [] as string[],
    password: [] as string[],
    passwordConfirmation: [] as string[]
  }
  password: string
  passwordConfirmation: string

  async validate(){
    if (this.username.trim() === ''){
      this.errors.username.push('不能为空')
    }
    const UserRepository = await handleGetRepository(User)
    const found = await UserRepository.find({where: {username: this.username}})
    if (found.length > 0){
      this.errors.username.push('已存在，不能重复注册')
    }
    if (!/[a-zA-Z0-9]/.test(this.username.trim())){
      this.errors.username.push('只支持数字和字母')
    }
    if (this.username.trim().length > 42){
      this.errors.username.push('太长')
    }
    if (this.username.trim().length < 3){
      this.errors.username.push('太短')
    }
    if (this.password === ''){
      this.errors.password.push('不能为空')
    }
    if (this.password !== this.passwordConfirmation){
      this.errors.passwordConfirmation.push('密码不匹配')
    }
  }
  hasErrors(){
    return !!Object.values(this.errors).find(v => v.length > 0)
  }
  @BeforeInsert()
  generatePasswordDigest(){
    this.passwordDigest = md5(this.password) as string
  }

  toJSON(){
    return _.omit(this, ['password', 'passwordConfirmation', 'passwordDigest', 'errors'])
  }
}
