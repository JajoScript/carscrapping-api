import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { FirebaseModule } from '@/modules/firebase/firebase.module';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { FirebaseAuthMiddleware } from '@/middlewares';

@Module({
  imports: [FirebaseModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FirebaseAuthMiddleware).forRoutes(UsersController);
  }
}
