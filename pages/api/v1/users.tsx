import {NextApiHandler} from "next";
import {handleGetRepository} from "@/lib/handleGetRepository";
import {User} from "@/src/entity/User";
import md5 from "md5";


const Users: NextApiHandler = async (req, res) => {
  const {username, password, passwordConfirmation} = req.body
  const errors = {
    username: [] as string[],
    password: [] as string[],
    passwordConfirmation: [] as string[]
  }
  if (username.trim() === ''){
    errors.username.push('不能为空')
  }
  if (!/[a-zA-Z0-9]/.test(username.trim())){
    errors.username.push('只支持数字和字母')
  }
  if (username.trim().length > 42){
    errors.username.push('太长')
  }
  if (username.trim().length < 3){
    errors.username.push('太短')
  }
  if (password === ''){
    errors.password.push('不能为空')
  }
  if (password !== passwordConfirmation){
    errors.passwordConfirmation.push('密码不匹配')
  }
  const hasError = Object.values(errors).find(v => v.length > 0)
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  if (hasError){
    res.statusCode = 422
    res.write(JSON.stringify(errors))
  }else{
    const UserRepository = await handleGetRepository(User)
    const user = new User()
    user.username = username.trim()
    user.passwordDigest = md5(password) as string
    await UserRepository.save(user)
    res.statusCode = 200
    res.write(JSON.stringify(user))
  }
  res.end()
}
export default Users
