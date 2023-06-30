import { AppDataSource } from "./data-source"
import { User } from "./entity/User"

AppDataSource.initialize().then(async (connection) => {
    console.log(connection)
    connection.close()
}).catch(error => console.log(error))
