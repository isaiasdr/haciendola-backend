import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';

async function bootstrap() {
  const logger = new Logger('main.ts');
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(`api/v${envs.api_version}`);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(envs.port);
  logger.log(`App running in port: ${envs.port}`);
}
bootstrap();
