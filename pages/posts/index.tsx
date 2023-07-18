import Link from "next/link";
import {GetServerSideProps, GetServerSidePropsContext, NextPage} from "next";
import {handleGetRepository} from "@/lib/handleGetRepository";
import {Post} from "@/src/entity/Post";

type Props = {
  posts: PostType[]
  page: number
  pageSize: number
  count: number
  totalPage: number
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
      <footer>
        第 {props.page}/{props.totalPage} 页，共 {props.count} 篇文章
        &nbsp;{ props.page !== 1 && <Link href={`?page=${props.page - 1}`}>上一页</Link> }
        { props.page < props.totalPage && <Link href={`?page=${props.page + 1}`}>下一页</Link> }
      </footer>
    </div>
  )
}
export default PostsIndex

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const page  = parseInt(context.query.page as string) || 1
  const pageSize = 3;
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
