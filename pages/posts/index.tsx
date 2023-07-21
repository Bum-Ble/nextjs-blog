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
    <div className="wrapper">
      <div className="content">
        <header>
          <h1>文章列表</h1>
        </header>
        {/*<h1 className="title">文章列表</h1>*/}
        {
          posts.map((post,index) =>
            <Link href={`/posts/${post.id}`} key={index}>
              <div className="onePost">
                <div className="postTitle"> {post.title} </div>
                <div className="postContent"> {post.content} </div>
                <div className="postContent">
                  {post.authorId}
                </div>
              </div>
            </Link>
          )
        }
        <footer>
          {pager}
        </footer>
      </div>
      <style jsx>{`
        .wrapper{
          width: 100%;
          height: 100%;
          background-color: #FDF5E6;
        }
        .content{
          padding-top: 10px;
          margin: 0 auto;
          max-width: 800px;
        }
        .onePost{
          height: 100px;
          margin: 20px 0;
          padding: 16px;
          background-color:#fff;
          cursor:pointer;
        }
        .postTitle{
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .postContent{
        font-size: 15px;
        color: #5c6066;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        }
      `}</style>
    </div>
  )
}
export default PostsIndex

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const page  = parseInt(context.query.page as string) || 1
  const pageSize = 10;
  const skip = (page - 1) * pageSize;
  const PostRepository = await handleGetRepository(Post)
  const [posts, count] = await PostRepository.findAndCount({
    skip,
    take:pageSize
  })
  console.log(posts)
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
      totalPage: Math.ceil(count / pageSize),
      count, page, pageSize
    }
  };
};
