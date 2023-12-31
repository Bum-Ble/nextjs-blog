import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "postgres",
    // host: "192.168.1.22",
    host: "localhost",
    port: 5432,
    username: "blog",
    password: "",
    database: `${process.env.NODE_ENV === 'production' ? 'blog_production' : 'blog_development'}`,
    synchronize: false,
    logging: false,
    entities: ['dist/entity/**/*.js'],
    migrations: ['dist/migration/**/*.js'],
    subscribers: ['dist/subscriber/**/*.js'],
})
