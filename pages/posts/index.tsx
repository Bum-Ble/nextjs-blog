import Link from "next/link";
import {GetServerSideProps, NextPage} from "next";
import {handleGetRepository} from "@/lib/handleGetRepository";
import {Post} from "@/src/entity/Post";

type Props = {
  posts: PostType[]
}
const PostsIndex: NextPage<Props> = (props) => {
  const {posts} = props
  return (
    <div>
      <h1>文章列表</h1>
      {
        posts.map(post =>
          <div key={post.id}>
            <Link href={`/posts/${post.id}`}>
              {post.title}
            </Link>
          </div>)
      }
    </div>
  )
}
export default PostsIndex

export const getServerSideProps: GetServerSideProps = async (context) => {
  const PostRepository = await handleGetRepository(Post)
  const posts = await PostRepository.find()
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts))
    }
  };
};
