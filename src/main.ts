import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { env } from '@/config';

async function bootstrap() {
  const logger = new Logger('main');
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: '*',
  });

  await app.listen(env.PORT, () => {
    logger.log(`http://localhost:${env.PORT}/api`);
    logger.log('Server started successfully.');
  });
}

void bootstrap();
