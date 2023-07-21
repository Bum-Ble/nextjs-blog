import Link from "next/link";
import {GetServerSideProps, GetServerSidePropsContext, NextPage} from "next";
import {handleGetRepository} from "@/lib/handleGetRepository";
import {Post} from "@/src/entity/Post";
import {usePager} from "@/hooks/usePager";
import {User} from "@/src/entity/User";

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
          <Link href="/posts/new">
            <span className="button" style={{}}>
              新增文章
            </span>
          </Link>
        </header>
        {
          posts.map((post,index) =>
            <Link href={`/posts/${post.id}`} key={index}>
              <div className="onePost">
                <div>
                  <div className="postTitle"> {post.title} </div>
                  <div className="postContent"> {post.content} </div>
                </div>
                <div className="postBottom">
                  <span>作者：{post.username} </span>
                  <span>发布时间：{post.createdAt.toString().split('T')[0]} </span>
                </div>
              </div>
            </Link>
          )
        }
        <footer className="pager">
          {pager}
        </footer>
      </div>
      <style jsx>{`
        header{
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }
        .wrapper{
          width: 100%;
          min-height: 100vh;
          background-color: #FDF5E6;
          padding: 30px 0;
        }
        .content{
          margin: 0 auto;
          max-width: 800px;
        }
        .onePost{
          margin: 20px 0;
          padding: 16px;
          background-color:#fff;
          cursor:pointer;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .onePost :hover{
          transition: 300ms all ;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .postTitle{
          font-size: 20px;
          font-weight: bold;
        }
        .postContent{
          font-size: 15px;
          color: #5c6066;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          margin: 10px 0;
        }
        .postBottom{
          color: #8a9aa9;
          font-size: 14px;
          display: flex;
          justify-content: space-between;
        }
        .pager{
          display: flex;
          justify-content: flex-end;
        }
        .button{
          width: 100px;
          height:40px; 
          background-color: #BA704F;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #f5f5f5;
          font-size: 14px;
          cursor:pointer;
        }
        .button:hover{
          background-color: rgba(186, 112, 79, 0.8);
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
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
  const UserRepository = await handleGetRepository(User)
  const [posts, count] = await PostRepository.findAndCount({
    skip,
    take:pageSize
  })
  await Promise.all(posts.map(async (post) => {
    const { username } = await UserRepository.findOne({ where: { id: post.authorId } });
    post.username = username;
  }));
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
      totalPage: Math.ceil(count / pageSize),
      count, page, pageSize
    }
  };
};
