import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { FirebaseModule } from '@/modules/firebase/firebase.module';

import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';
import { FirebaseAuthMiddleware } from '@/middlewares';

@Module({
  imports: [FirebaseModule],
  controllers: [BrandsController],
  providers: [BrandsService],
  exports: [BrandsService],
})
export class BrandsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FirebaseAuthMiddleware).forRoutes(BrandsController);
  }
}
