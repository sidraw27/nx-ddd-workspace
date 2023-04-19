import { routes } from '@infrastructure/routes/v1.route';
import { Module } from '@nestjs/common';

@Module({
  imports: routes.map((router) => router.module),
})
export class ControllerModule {}
