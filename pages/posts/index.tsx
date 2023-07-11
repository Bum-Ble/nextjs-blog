import Link from "next/link";
import {GetServerSideProps, NextPage} from "next";
import {usePosts} from "@/hooks/usePosts";
import {getPosts} from "@/lib/posts";

type Props = {
  posts: PostType[]
}
const PostsIndex: NextPage<Props> = (props) => {
  const { posts } = props
  return (
    <div>
      <Link href='/'>返回至首页</Link>
      <h1>文章列表</h1>
      {
        posts.map(item => <div key={item.id}>
          <Link href={`/posts/${item.id}`}>
            {item.id}
          </Link>
        </div>)
      }
    </div>
  )
}
export default PostsIndex

export const getStaticProps = async () => {
  const posts = await getPosts()
  return {
    props : {
      posts: JSON.parse(JSON.stringify(posts))
    }
  }
}

// const index: NextPage<Props> = (props) =>{
//   const { browser } = props
//   return (
//     <div> 你的浏览器是 {browser.name} </div>
//   )
// }
// export default index
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const us = context.req.header('use-agent')
//   const result = new UAParser(ua).getResult()
//   return {
//     props:{
//       browser: result.browser
//     }
//   }
// }
