import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/lib/session";

export default withIronSessionApiRoute(logoutRoute, sessionOptions);

async function logoutRoute(req:any, res:any) {
  req.session.destroy();
  res.status(200).json({success: '退出登录成功'})
}
