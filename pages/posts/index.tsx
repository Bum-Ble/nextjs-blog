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
      {/*<div className="overlay"/>*/}
      {/* 添加蒙版层 */}
      <div className="content">
        <header>
          <h1 className="textColor">文章列表</h1>
          <Link href="/posts/new">
            <span className="button textColor">
              新增文章
            </span>
          </Link>
        </header>
        {
          posts.map((post, index) =>
            <Link href={`/posts/${post.id}`} key={index}>
              <div className="onePost">
                <div>
                  <div className="postTitle"> {post.title} </div>
                  <div className="postContent"> {post.content} </div>
                </div>
                <div className="postBottom">
                  <span>作者：{post.username} {post.username === 'Bumble' ?
                    <span className="orange-tag">博主</span> : null}</span>
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
        header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .textColor {
          //color: #f5f5f5;
        }

        .wrapper {
          background-color: #E8E8E8;
          width: 100%;
          min-height: 100vh;
          padding: 30px 0;
        }

        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(51, 51, 51, 0.5); /* 设置蒙版层颜色和透明度 */
        }

        .content {
          position: relative;
          padding: 60px 100px;
          background-color: rgb(232, 232, 232, 0.8);
          margin: 0 auto;
          max-width: 800px;
          box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
          border-radius: 6px;
          z-index: 1;
        }

        .onePost {
          margin: 26px 0;
          padding: 16px;
          background-color: rgb(244, 244, 242);
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .onePost :hover {
          transition: 300ms all;
          box-shadow: rgb(73, 84, 100, 0.4) 0px 4px 12px;
        }

        .postTitle {
          font-size: 20px;
          font-weight: bold;
        }

        .postContent {
          font-size: 15px;
          color: #5c6066;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          margin: 10px 0;
        }

        .postBottom {
          color: #8a9aa9;
          font-size: 14px;
          display: flex;
          justify-content: space-between;
        }

        .pager {
          display: flex;
          justify-content: flex-end;
        }

        .button {
          width: 100px;
          height: 40px;
          background-color:#4682A9;
          border-radius: 4px;
          color: #f5f5f5;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 14px;
          cursor: pointer;
          box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
        }

        .button:hover {
          background-color: #749BC2;
        }

        .orange-tag {
          font-size: 12px;
          display: inline-block;
          padding: 3px 6px;
          color: #d46b08;
          background: #fff7e6;
          border-color: #ffd591;
          border-radius: 4px;
        }
      `}</style>
    </div>
  )
}
export default PostsIndex

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const page = parseInt(context.query.page as string) || 1
  const pageSize = 6;
  const skip = (page - 1) * pageSize;
  const PostRepository = await handleGetRepository(Post)
  const UserRepository = await handleGetRepository(User)
  const [posts, count] = await PostRepository.findAndCount({
    skip,
    take: pageSize
  })
  await Promise.all(posts.map(async (post) => {
    const {username} = await UserRepository.findOne({where: {id: post.authorId}}) as User;
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
