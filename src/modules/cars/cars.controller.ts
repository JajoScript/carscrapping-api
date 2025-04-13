import {
  Controller,
  Get,
  HttpStatus,
  Logger,
  Param,
  Query,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  private readonly logger = new Logger(CarsController.name);

  constructor(private readonly service: CarsService) {}

  // *-- Endpoints.
  @Get('brand/:brand')
  async getCarsByBrand(
    @Param('brand') brand: string,
    @Query('page') page: number = 1,
    @Res() res: Response,
  ) {
    this.logger.log('Fetching cars by brand');

    const cars = await this.service.getCarsByBrand(brand, page);
    const total_pages: number = await this.service.getTotalPagesByBrand(brand);

    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: `Cars by brand: ${brand}`,
      data: {
        cars,
        page,
        total_pages,
      },
    });
    return;
  }
}
