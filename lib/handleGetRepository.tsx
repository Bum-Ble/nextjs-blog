import {DataSource} from "typeorm";
import {AppDataSource} from "@/src/data-source";
import {User} from "@/src/entity/User";
import {Post} from "@/src/entity/Post";
import {Comment} from "@/src/entity/Comment";

export const handleGetRepository = async (entity) => {
  // @ts-ignore
  const dataSource = new DataSource({
    ...AppDataSource.options,
    entities: [User, Post, Comment],
  });
  return dataSource.isInitialized
    ? dataSource.getRepository(entity)
    : (await dataSource.initialize()).getRepository(entity);
}
