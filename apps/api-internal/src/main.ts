import { AppModule } from '@infrastructure/modules/app.module';
import { AllExceptionsFilter } from '@infrastructure/utils/exception-filters/all-exception.filter';
import { INestApplication, Logger, NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'reflect-metadata';

export async function createApp(
  options?: NestApplicationOptions,
): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule, options);
  const httpAdapter = app.get(HttpAdapterHost);

  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
      transform: true,
      validationError: {
        target: false,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Internal API')
    .setDescription('NX repo DDD example API document')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  Logger.log(
    '🚀 Application is running'
  );

  return app;
}

async function main() {
  const app = await createApp();
  await app.listen(3001);
}

void main();
