import {NextApiHandler} from "next";
import {SignIn} from "@/src/model/SignIn";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/lib/session";

const Sessions: NextApiHandler = async (req, res) => {
  const {username, password} = req.body
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  const signIn = new SignIn()
  signIn.username = username
  signIn.password = password
  await signIn.validate()
  if (signIn.hasErrors()){
    res.statusCode = 422
    res.end(JSON.stringify(signIn.errors))
  }else {
    // @ts-ignore
    req.session.currentUser = signIn.user
    await req.session.save()
    res.statusCode = 200
    res.end(JSON.stringify(signIn.user))
  }
}
export default withIronSessionApiRoute(Sessions, sessionOptions)
