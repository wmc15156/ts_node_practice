// config.js로 바꾼후 db:create 실시 한후 .ts로 바꾸자
import * as dotenv from 'dotenv';

dotenv.config();

type Config = {
  username: string,
  password: string,
  database: string,
  host: string,
  [key:string]: string
}

interface IConfig {
  development: Config,
  test: Config,
  production: Config,
}

const config:IConfig =   {
  "development": {
    "username": "root",
    "password": process.env.DB_PASSWORD!,
    "database": "tsc_node",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": process.env.DB_PASSWORD!,
    "database": 'tsc_node',
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": process.env.DB_PASSWORD!,
    "database": 'tsc_node',
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

export default config;
