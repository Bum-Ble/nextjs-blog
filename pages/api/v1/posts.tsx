import {NextApiHandler} from "next";
import {handleGetRepository} from "@/lib/handleGetRepository";
import {Post} from "@/src/entity/Post";
import {withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/lib/session";

const Posts: NextApiHandler = withIronSessionApiRoute(async (req, res) => {
  if (req.method === 'POST'){
    const user = req.session.currentUser
    if (!user){
      res.statusCode = 401
      res.end()
      return
    }
    const {title, content} = req.body
    const post = new Post()
    post.title = title
    post.content = content
    post.author = user
    const PostRepository = await handleGetRepository(Post)
    await PostRepository.save(post)
    res.json(post)
  }
}, sessionOptions)
export default Posts
