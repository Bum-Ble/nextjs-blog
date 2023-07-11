import Link from "next/link";
import {GetServerSideProps, NextPage} from "next";
import {AppDataSource} from "@/src/data-source"
import {User} from "@/src/entity/User";
import {Post} from "@/src/entity/Post";
import {Comment} from "@/src/entity/Comment";
import {DataSource} from "typeorm";

type Props = {
  name: string
}

const Posts: NextPage<Props> = (props) => {
  return (
    <div>
      这里是首页 {props.name}
      <div>
        <Link href='/posts'>进入到我的博客</Link>
      </div>
    </div>
  );
}
export default Posts;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const UserRepository = await handleGetRepository(User)
  const PostRepository = await handleGetRepository(Post)
  const users = await UserRepository.find()
  const posts = await PostRepository.find()
  console.log(users)
  console.log(posts)
  return {
    props: {
      name: 'Bumble'
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
