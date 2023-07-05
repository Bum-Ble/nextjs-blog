import {AppDataSource} from "./data-source"

AppDataSource.initialize().then(async (connection) => {
  connection.close()
}).catch(error => console.log(error))
