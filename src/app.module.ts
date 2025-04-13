import { Module } from '@nestjs/common';
import { FirebaseModule } from '@/modules/firebase/firebase.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { BrandsModule } from '@/modules/brands/brands.module';
import { CarsModule } from '@/modules/cars/cars.module';

@Module({
  imports: [AuthModule, FirebaseModule, BrandsModule, CarsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
