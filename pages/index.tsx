import Link from "next/link";
import {GetServerSideProps, NextPage} from "next";
import {Post} from "@/src/entity/Post";
import {handleGetRepository} from "@/lib/handleGetRepository";

type Props = {
  posts: PostType[]
}

const Posts: NextPage<Props> = (props) => {
  const {posts} = props
  return (
    <div>
      {posts.map(post =>
        <div key={post.id}>
          <Link href={`/posts/${post.id}`}>
            {post.title}
          </Link>
        </div>
        )}
    </div>
  );
}
export default Posts;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const PostRepository = await handleGetRepository(Post)
  const posts = await PostRepository.find()
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts))
    }
  };
};


