import { IsAlphanumeric, Length } from 'class-validator';

export class SignoutDTO {
  @IsAlphanumeric('en-US', { message: 'uid must be alphanumeric' })
  @Length(28, 36, { message: 'uid must be between 28 and 36 characters' })
  uid: string;
}
