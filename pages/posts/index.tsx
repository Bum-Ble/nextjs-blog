import Link from "next/link";
import {GetServerSideProps, GetServerSidePropsContext, NextPage} from "next";
import {handleGetRepository} from "@/lib/handleGetRepository";
import {Post} from "@/src/entity/Post";
import {usePager} from "@/hooks/usePager";

type Props = {
  posts: PostType[]
  page: number
  pageSize: number
  count: number
  totalPage: number
}
const PostsIndex: NextPage<Props> = (props) => {
  const {posts, page, totalPage} = props
  const {pager} = usePager({page, totalPage})
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
      <footer>
        {pager}
      </footer>
    </div>
  )
}
export default PostsIndex

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const page  = parseInt(context.query.page as string) || 1
  const pageSize = 1;
  const skip = (page - 1) * pageSize;
  const PostRepository = await handleGetRepository(Post)
  const [posts, count] = await PostRepository.findAndCount({
    skip,
    take:pageSize
  })
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
      totalPage: Math.ceil(count / pageSize),
      count, page, pageSize
    }
  };
};
