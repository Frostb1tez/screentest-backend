import type { ConnectionOptions } from 'typeorm'

import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

import configuration from './configuration'
const config = configuration()
const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: config.database.host || 'localhost',
  port: config.database.port || 5432,
  username: config.database.username || 'postgres',
  password: config.database.password || 'Hello123',
  database: config.database.name || 'postgres',
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
