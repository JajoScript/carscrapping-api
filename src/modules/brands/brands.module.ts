import { Module } from '@nestjs/common';
import { FirebaseModule } from '@/modules/firebase/firebase.module';
import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';

@Module({
  imports: [FirebaseModule],
  controllers: [BrandsController],
  providers: [BrandsService],
  exports: [BrandsService],
})
export class BrandsModule {}
