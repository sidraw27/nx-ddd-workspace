import { NamingStrategy, Options, UnderscoreNamingStrategy } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import pluralize from 'pluralize';
import { env } from 'process';

class PluralNamingStrategy extends UnderscoreNamingStrategy implements NamingStrategy {
  classToTableName(entityName: string): string {
    return pluralize(`${super.classToTableName(entityName)}`);
  }

  joinKeyColumnName(entityName: string, referencedColumnName?: string): string {
    return `${super.classToTableName(entityName)}_${(referencedColumnName || super.referenceColumnName())}`;
  }
}

export default {
  driver: PostgreSqlDriver,
  timezone: '00:00',

  dbName: env.DB_NAME,
  host: env.DB_HOST,
  port: parseInt(env.DB_PORT ?? '5432', 10),
  user: env.DB_USER,
  password: env.DB_PASSWORD,

  debug: ['query'],

  entities: [`${__dirname}/entities`, 'dist/libs/mikro-orm-model/src/entities'],

  allowGlobalContext: true,
  namingStrategy: PluralNamingStrategy,
} as Options<PostgreSqlDriver>;
