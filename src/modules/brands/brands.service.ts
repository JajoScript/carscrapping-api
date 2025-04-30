import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  DocumentReference,
  DocumentSnapshot,
  Firestore,
} from 'firebase-admin/firestore';
import { CreateBrandDTO } from './DTOs';

@Injectable()
export class BrandsService {
  private readonly logger = new Logger(BrandsService.name);

  constructor(@Inject('FIRESTORE') private readonly firestore: Firestore) {}

  // *-- Methods
  async getPages(): Promise<number> {
    const take: number = 25;
    const snapshot = await this.firestore.collection('brands').get();
    const total: number = snapshot.docs.length;
    const pages: number = Math.ceil(total / take);

    return pages;
  }

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

  async createBrand(brand: CreateBrandDTO): Promise<any> {
    const docRef: DocumentReference = await this.firestore
      .collection('brands')
      .add(brand);
    await docRef.set({ brandID: docRef.id }, { merge: true });

    const docSnap: DocumentSnapshot = await docRef.get();
    const newBrand = docSnap.data();

    console.log('Brand created with ID:', docRef.id);
    return newBrand;
  }
}
