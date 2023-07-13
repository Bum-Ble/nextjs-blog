import {User} from "@/src/entity/User";
import {handleGetRepository} from "@/lib/handleGetRepository";
import md5 from "md5";

export class SignIn {
  username: string
  password: string
  errors = {
    username: [] as string[],
    password: [] as string[],
  }
  user: User

  async validate(){
    if (this.username.trim() === ''){
      this.errors.username.push('请填写用户名')
    }
    const UserRepository = await handleGetRepository(User)
    const user = await UserRepository.findOne({where: {username: this.username}})
    if (user){
      this.user = user as User
      if (md5(this.password) !== user.passwordDigest){
        this.errors.password.push('密码与用户名不匹配')
      }
    }else{
      this.errors.username.push('用户名不存在')
    }
  }
  hasErrors(){
    return !!Object.values(this.errors).find(v => v.length > 0)
  }
}
