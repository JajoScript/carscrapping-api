import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('main');
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 3000, () => {
    logger.log(`http://localhost:${process.env.PORT ?? 3000}/api`);
    logger.log('Server started successfully.');
  });
}

void bootstrap();
