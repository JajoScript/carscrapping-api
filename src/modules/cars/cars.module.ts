import { Module } from '@nestjs/common';
import { FirebaseModule } from '@/modules/firebase/firebase.module';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';

@Module({
  imports: [FirebaseModule],
  controllers: [CarsController],
  providers: [CarsService],
  exports: [CarsService],
})
export class CarsModule {}
