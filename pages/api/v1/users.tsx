import {NextApiHandler} from "next";
import {handleGetRepository} from "@/lib/handleGetRepository";
import {User} from "@/src/entity/User";
import md5 from "md5";


const Users: NextApiHandler = async (req, res) => {
  const {username, password, passwordConfirmation} = req.body
  const UserRepository = await handleGetRepository(User)
  const user = new User()
  user.username = username.trim()
  user.password = password
  user.passwordConfirmation = passwordConfirmation
  await user.validate()
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  if (user.hasErrors()){
    res.statusCode = 422
    res.write(JSON.stringify(user.errors))
  }else{
    await UserRepository.save(user)
    res.statusCode = 200
    res.write(JSON.stringify(user))
  }
  res.end()
}
export default Users
