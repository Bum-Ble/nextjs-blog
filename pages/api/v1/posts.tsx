import {NextApiHandler} from "next";
import {handleGetRepository} from "@/lib/handleGetRepository";
import {Post} from "@/src/entity/Post";
import {withSession} from "@/lib/withSession";

const Posts: NextApiHandler = withSession(async (req, res) => {
  if (req.method === 'POST'){
    const {title, content} = req.body
    const post = new Post()
    post.title = title
    post.content = content
    post.author = req.session.get('currentUser')
    const PostRepository = await handleGetRepository(Post)
    await PostRepository.save(post)
    res.json(post)
  }
})
export default Posts
