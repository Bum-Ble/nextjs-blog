import {GetStaticPaths, GetStaticProps, NextPage} from "next";
import {getPost, getPostIds} from "@/lib/posts";

type Props = {
  post: PostType
}
const postsShow: NextPage<Props> = (props) => {
  const {post} = props
  return (
    <div>
      <h1>{post.title}</h1>
      <article dangerouslySetInnerHTML={{__html: post.htmlContent}}/>
    </div>
  )
}
export default postsShow

export const getStaticPaths:GetStaticPaths = async () => {
  const idList = await getPostIds()
  return {
    paths: idList.map(id => ({params: {id}})),
    fallback: false
  }
}
export const getStaticProps:GetStaticProps = async (x:any) => {
  const id = x.params.id
  const post = await getPost(id)
  return {
    props: { post }
  }
}
