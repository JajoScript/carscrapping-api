import { Controller, Get, HttpStatus, Logger, Res } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { Response } from 'express';

@Controller('brands')
export class BrandsController {
  private readonly logger = new Logger(BrandsController.name);

  constructor(private readonly service: BrandsService) {}

  // *-- Endpoints
  @Get('/')
  async getBrands(@Res() res: Response) {
    this.logger.log('Fetching all brands');
    const brands = await this.service.getBrands();

    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: 'Brands fetched successfully',
      brands,
    });
    return;
  }
}
