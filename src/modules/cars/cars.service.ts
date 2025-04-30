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

    const brandSnap = await this.firestore
      .collection('brands')
      .where('name', '==', brand)
      .get();

    if (brandSnap.empty) {
      this.logger.warn(`No cars found for brand: ${brand}`);
      return [];
    }

    const brandDoc = brandSnap.docs[0];
    const carsSnap = await brandDoc.ref
      .collection('autos')
      .orderBy('model')
      .offset(skip)
      .limit(take)
      .get();

    return carsSnap.docs.map((doc) => doc.data());
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

  async migration() {
    const autosSnap = await this.firestore.collection('autos').get();

    for (const doc of autosSnap.docs) {
      const autoData = doc.data();
      const brandName = autoData.marca?.trim();

      if (!brandName) {
        console.warn(`Auto sin marca: ID ${doc.id}`);
        continue;
      }

      // Buscar documento de la marca
      const brandSnap = await this.firestore
        .collection('brands')
        .where('name', '==', brandName)
        .limit(1)
        .get();

      if (brandSnap.empty) {
        console.warn(
          `Marca no encontrada para auto ID ${doc.id}: ${brandName}`,
        );
        continue;
      }

      const brandDoc = brandSnap.docs[0];
      const brandDocRef = brandDoc.ref;

      // Copiar auto como subcolección de la marca
      const payload = {
        carID: doc.id,
        model: autoData.modelo,
        description: autoData.extras,
        price: autoData.precio,
        brandID: brandDoc.id,
        photoURL: '',
      };
      await brandDocRef.collection('autos').doc(doc.id).set(payload);

      console.log(`Auto ${doc.id} migrado a brand ${brandName}`);
    }

    console.log('Migración completada.');
  }
}
