import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBrandDTO {
  @IsString({ message: 'Brand name must be a string' })
  @IsNotEmpty({ message: 'Brand name must not be empty' })
  name: string;

  @IsString({ message: 'Website must be a string' })
  @IsNotEmpty({ message: 'Website must not be empty' })
  website: string;
}
