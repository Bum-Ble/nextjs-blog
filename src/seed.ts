import {AppDataSource} from "./data-source"
import {Post} from "./entity/Post";

AppDataSource.initialize().then(async (connection) => {
  const posts = await connection.manager.find(Post)
  if (posts.length === 0) {
    await connection.manager.save([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => {
      return new Post(`Post ${n}`, `这是第${n}个博客`)
    }))
  }
  console.log('posts 数据填充完了')
  connection.close()
}).catch(error => console.log(error))
