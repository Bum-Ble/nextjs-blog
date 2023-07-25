import {NextApiHandler} from "next";
import {handleGetRepository} from "@/lib/handleGetRepository";
import {Post} from "@/src/entity/Post";
import {withSession} from "@/lib/withSession";

const Posts: NextApiHandler = withSession(async (req, res) => {
  if (req.method === 'PATCH'){
    const {title, content, authorId, id} = req.body
    const user = req.session.get('currentUser')
    if (!user){
      res.statusCode = 401
      res.end()
      return
    }else if (user.id !== authorId){
      res.statusCode = 405
      res.end('只允许修改本人的文章')
      return
    }
    const PostRepository = await handleGetRepository(Post)
    const post = await PostRepository.findOneBy({id}) as PostType
    post.title = title
    post.content = content
    await PostRepository.save(post)
    res.json(post)
  }
})
export default Posts
