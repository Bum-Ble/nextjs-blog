"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppDataSource = void 0;
require("reflect-metadata");
var _typeorm = require("typeorm");
var AppDataSource = new _typeorm.DataSource({
  type: "postgres",
  // host: "192.168.1.22",
  host: "localhost",
  port: 5432,
  username: "blog",
  password: "",
  database: "".concat(process.env.NODE_ENV === 'production' ? 'blog_production' : 'blog_development'),
  synchronize: false,
  logging: false,
  entities: ['dist/entity/**/*.js'],
  migrations: ['dist/migration/**/*.js'],
  subscribers: ['dist/subscriber/**/*.js']
});
exports.AppDataSource = AppDataSource;