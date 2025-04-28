import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { BrandsService } from './brands.service';
import { Response } from 'express';
import { CreateBrandDTO } from './DTOs';

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

  @Post('/create')
  async createBrand(
    @Body(new ValidationPipe()) body: CreateBrandDTO,
    @Res() res: Response,
  ) {
    this.logger.log('Create brand');

    const brand = await this.service.createBrand(body);

    res.status(HttpStatus.CREATED).send({
      status: HttpStatus.CREATED,
      message: 'Brand created successfully',
      brand,
    });
    return;
  }
}
