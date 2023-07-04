import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import {Post} from "./entity/Post";

AppDataSource.initialize().then(async (connection) => {
    const posts = await connection.manager.find(Post)
    console.log(posts)
    const p = new Post()
    p.title = 'Post 1'
    p.content = '这是一个demo'
    await connection.manager.save(p)
    const posts2 = await connection.manager.find(Post)
    console.log(posts2)
    connection.close()
}).catch(error => console.log(error))
