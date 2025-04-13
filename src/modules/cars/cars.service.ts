import { Inject, Injectable, Logger } from '@nestjs/common';
import { Firestore } from 'firebase-admin/firestore';

@Injectable()
export class CarsService {
  private readonly logger = new Logger(CarsService.name);

  constructor(@Inject('FIRESTORE') private readonly firestore: Firestore) {}

  // *-- Methods
  async getCarsByBrand(brand: string, page: number = 1) {
    const take: number = 25;
    const skip: number = (page - 1) * take;

    const cars = await this.firestore
      .collection('autos')
      .where('marca', '==', brand)
      .offset(skip)
      .limit(take)
      .get();

    return cars.docs.map((doc) => doc.data());
  }

  async getTotalCarsByBrand(brand: string): Promise<number> {
    const cars = await this.firestore
      .collection('autos')
      .where('marca', '==', brand)
      .get();

    return cars.docs.length;
  }

  async getTotalPagesByBrand(brand: string): Promise<number> {
    const totalCars = await this.getTotalCarsByBrand(brand);
    const take: number = 25;

    return Math.ceil(totalCars / take);
  }
}
