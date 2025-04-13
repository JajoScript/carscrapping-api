import { Inject, Injectable, Logger } from '@nestjs/common';
import { Firestore } from 'firebase-admin/firestore';

@Injectable()
export class BrandsService {
  private readonly logger = new Logger(BrandsService.name);

  constructor(@Inject('FIRESTORE') private readonly firestore: Firestore) {}

  // *-- Methods
  async getBrands(page: number = 1) {
    const take: number = 25;
    const skip: number = (page - 1) * take;
    const snapshot = await this.firestore
      .collection('brands')
      .offset(skip)
      .limit(take)
      .get();

    const brands = snapshot.docs.map((doc) => doc.data());
    return brands;
  }
}
