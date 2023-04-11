/* eslint-disable prettier/prettier */
import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

const databaseConfig: DataSourceOptions & SeederOptions = {
  type: <any>process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: ['src/**/entities/**', '*.entity{.ts,.js}'],
  migrations: [__dirname + '/../database/migrations/**/*{.ts,.js}'],
  seeds: ['src/database/seeds/*{.ts,.js}'],
  synchronize: false, // Set to false else might have risk of dropping columns in production table which is very dangerous
  dropSchema: false, // Set to false else might have risk of dropping database in production table which is very dangerous
};

export default databaseConfig;
