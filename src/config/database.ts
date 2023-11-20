import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

const config = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity{.ts,.js}'],
  subscribers: ['dist/**/*.subscriber{.ts,.js}'],
  migrations: ['dist/migrations/*-migrations.js'],
  cli: {
    migrationsDir: 'dist/migrations',
  },
  autoLoadEntities: true,
  synchronize: false,
  migrationsRun: true,
  logging: true,
};

export const dbConf = registerAs('typeorm', () => config);
export const dataSource = new DataSource(config as DataSourceOptions);
