import {GetServerSideProps, NextPage} from "next";
import {handleGetRepository} from "@/lib/handleGetRepository";
import {Post} from "@/src/entity/Post";
import Link from "next/link";
import axios from "axios";
import {useRouter} from "next/router";

const marked = require('marked');

type Props = {
  post: PostType
}
const PostsShow: NextPage<Props> = (props) => {
  const {post} = props
  const router = useRouter()
  const handleDelete = () => {
    const result = window.confirm('确定要删除文章吗？')
    if (result){
      axios.delete(`/api/v1/posts/${post.id}`).then(() => {
        alert('删除成功')
        router.push('/posts')
      }, (error) => {
        window.alert(error.response.data.message)
      })
    }
  }
  return (
    <>
      <div className="wrapper">
        <div className="content">
          <div className="link">
            <Link href={`/posts/${post.id}/edit`}><a className="link-text">编辑</a></Link>
            <Link href="/posts"><a className="link-text">返回列表</a></Link>
            <button className="deleteBtn link-text" onClick={handleDelete}>删除文章</button>

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
            align-items: center;
          }
          .link-text{
            margin: 0 6px;
            text-decoration: none;
            color: #0056b3;
            
          }
          .link-text:hover{
            color: #007bff;
          }
          .deleteBtn{
            padding: 0;
            border: none;
            background-color: #fff;
            font-size: 16px;
            cursor: pointer;
          
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
export default PostsShow

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
