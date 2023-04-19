import { UserModule } from '@infrastructure/modules/user.module';
import { Routes } from '@nestjs/core';

export const routes: Routes = [
  {
    path: 'users',
    module: UserModule,
  },
];
