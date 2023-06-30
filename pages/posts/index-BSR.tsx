import Link from "next/link";
import {NextPage} from "next";
import {usePosts} from "@/hooks/usePosts";


const PostsIndex: NextPage = () => {
  const {isLoading, isEmpty, posts} = usePosts()
  return (
    <div>
      <Link href='/'>返回至首页</Link>
      <h1>文章列表</h1>
      {
        isLoading ? <div>加载中</div> :
          isEmpty ? <div>没有文章</div> :
          posts.map(item => <div key={item.id}>
            {item.id}
          </div>)
      }
    </div>
  )
}
export default PostsIndex
