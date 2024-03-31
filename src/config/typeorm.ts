import type { ConnectionOptions } from 'typeorm'

import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

import configuation from './configuration'
const config = configuation()
const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.name,
  namingStrategy: new SnakeNamingStrategy(),
  entities: [__dirname + '/../entities/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migration/*{.ts,.js}'],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migration',
  },
  ssl: process.env.MODE === 'production',
}

export default connectionOptions
