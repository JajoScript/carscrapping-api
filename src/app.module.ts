import { Module } from '@nestjs/common';
import { FirebaseModule } from '@/modules/firebase/firebase.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { BrandsModule } from '@/modules/brands/brands.module';

@Module({
  imports: [AuthModule, FirebaseModule, BrandsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
