import { ControllerModule } from '@infrastructure/modules';
import { routes as v1Routes } from '@infrastructure/routes/v1.route';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule, Routes } from '@nestjs/core';

const routers: Routes = [
  {
    path: 'api',
    children: [
      {
        path: 'v1',
        children: v1Routes,
      },
    ],
  },
];

const v1Modules = v1Routes.map((route) => route.module);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RouterModule.register(routers),
    ControllerModule,
    ...v1Modules,
  ],
})
export class AppModule {}
