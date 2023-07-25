import {GetServerSideProps, NextPage} from "next";
import {handleGetRepository} from "@/lib/handleGetRepository";
import {Post} from "@/src/entity/Post";
import Link from "next/link";

const marked = require('marked');

type Props = {
  post: PostType
}
const postsShow: NextPage<Props> = (props) => {
  const {post} = props
  return (
    <>
      <div className="wrapper">
        <div className="content">
          <div className="link">
            <Link  href={`/posts/${post.id}/edit`}><a className="link-text">编辑</a></Link>
            <Link  href="/posts"><a className="link-text">返回列表</a></Link>
          </div>
          <h1>{post.title}</h1>
          <article className="markdown-body" dangerouslySetInnerHTML={{__html: marked.parse(post.content)}}/>
        </div>
        <style jsx>{`
          .wrapper {
            background-color: #E8E8E8;
            padding: 30px 0;
            width: 100%;
            min-height: 100vh;
          }
          .link{
            display: flex;
            justify-content: flex-end;
          }
          .link-text{
            margin-left: 10px;
            text-decoration: none;
          }

          .content {
            min-width: 200px;
            max-width: 980px;
            margin: 30px auto;
            padding: 45px;
            background-color: #fff;
          }

          @media (max-width: 767px) {
            .wrapper {
              padding: 15px;
            }
          }
        `}
        </style>
      </div>
    </>
  )
}
export default postsShow

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {params} = context;
  const PostRepository = await handleGetRepository(Post)
  const post = await PostRepository.findOneBy({id: params?.id})
  return {
    props: {
      post: JSON.parse(JSON.stringify(post))
    }
  };
};
