import { IsJWT, IsNotEmpty } from 'class-validator';

export class VerifyTokenDTO {
  @IsNotEmpty({ message: 'Token is required' })
  @IsJWT({ message: 'Token is invalid' })
  token: string;
}
