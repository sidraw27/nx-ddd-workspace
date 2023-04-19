import { UserController } from '@adapter/controllers';
import * as useCases from '@application/user';
import { RepositoryModule } from '@infrastructure/modules/repository.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [RepositoryModule],
  controllers: [UserController],
  providers: [Object.values(useCases)].flat(),
})
export class UserModule {}
