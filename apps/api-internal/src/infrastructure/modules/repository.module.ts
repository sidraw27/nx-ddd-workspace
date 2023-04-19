import * as converters from '@infrastructure/converters';
import * as repositories from '@infrastructure/repositories';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import * as entities from '@model/entities';
import ormConfig from '@model/mikro-orm.config';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MikroOrmModule.forRoot(ormConfig),
    MikroOrmModule.forFeature(Object.values(entities)),
  ],
  providers: [Object.values(converters), Object.values(repositories)].flat(),
  exports: Object.values(repositories),
})
export class RepositoryModule {}
