import {GetServerSideProps, NextPage} from "next";
import {handleGetRepository} from "@/lib/handleGetRepository";
import {Post} from "@/src/entity/Post";

type Props = {
  post: PostType
}
const postsShow: NextPage<Props> = (props) => {
  const {post} = props
  return (
    <div>
      <h1>{post.title}</h1>
      <article dangerouslySetInnerHTML={{__html: post.content}}/>
    </div>
  )
}
export default postsShow

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const PostRepository = await handleGetRepository(Post)
  const post = await PostRepository.findOneBy({id: params?.id})
  return {
    props: {
      post: JSON.parse(JSON.stringify(post))
    }
  };
};
