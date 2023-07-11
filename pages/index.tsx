import Link from "next/link";
import {GetServerSideProps, NextPage} from "next";
import {AppDataSource} from "@/src/data-source"
import {User} from "@/src/entity/User";
import {Post} from "@/src/entity/Post";
import {Comment} from "@/src/entity/Comment";
import {DataSource} from "typeorm";

type Props = {
  posts: PostType[]
}

const Posts: NextPage<Props> = (props) => {
  const {posts} = props
  return (
    <div>
      {posts.map(post => <div key={post.id}>{post.title}</div>)}
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

const handleGetRepository = async (entity) => {
  // @ts-ignore
  const dataSource = new DataSource({
    ...AppDataSource.options,
    entities: [User, Post, Comment],
  });
  return dataSource.isInitialized
    ? dataSource.getRepository(entity)
    : (await dataSource.initialize()).getRepository(entity);
}
