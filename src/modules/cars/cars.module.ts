import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { FirebaseModule } from '@/modules/firebase/firebase.module';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { FirebaseAuthMiddleware } from '@/middlewares';
import { BrandsController } from '../brands/brands.controller';

@Module({
  imports: [FirebaseModule],
  controllers: [CarsController],
  providers: [CarsService],
  exports: [CarsService],
})
export class CarsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(FirebaseAuthMiddleware)
      .exclude('migrate')
      .forRoutes(BrandsController);
  }
}
