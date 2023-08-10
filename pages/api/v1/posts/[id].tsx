import {NextApiHandler} from "next";
import {handleGetRepository} from "@/lib/handleGetRepository";
import {Post} from "@/src/entity/Post";
import {withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/lib/session";

const Posts: NextApiHandler = withIronSessionApiRoute(async (req, res) => {
  const {id} = req.query
  const PostRepository = await handleGetRepository(Post)
  const post = await PostRepository.findOneBy({id}) as PostType
  const authorId = post.authorId
  const {title, content} = req.body
  // @ts-ignore
  const user = req.session.currentUser
  if (!user){
    res.statusCode = 401
    res.end()
    return
  }else if (user.id !== authorId){
    res.status(405).json({message: '只允许操作本人的文章'})
    return
  }
  if (req.method === 'PATCH'){
    post.title = title
    post.content = content
    await PostRepository.save(post)
    res.json(post)
  }else if (req.method === 'DELETE'){
    try{
      await PostRepository.remove(post)
      res.end()
    }catch (error){
      res.status(500).json({ message: '删除操作失败' })
    }
  }
}, sessionOptions)
export default Posts
