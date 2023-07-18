import {NextApiHandler} from "next";
import {handleGetRepository} from "@/lib/handleGetRepository";
import {Post} from "@/src/entity/Post";
import {withSession} from "@/lib/withSession";

const Posts: NextApiHandler = withSession(async (req, res) => {
  if (req.method === 'POST'){
    const user = req.session.get('currentUser')
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
})
export default Posts
