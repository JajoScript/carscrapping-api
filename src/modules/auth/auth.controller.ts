import {
  Body,
  Controller,
  HttpStatus,
  Logger,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { SignoutDTO, SignupDTO, VerifyTokenDTO } from './DTOs';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly service: AuthService) {}

  // *-- Endpoints.
  @Post('/signup')
  async signup(
    @Body(new ValidationPipe()) body: SignupDTO,
    @Res() res: Response,
  ) {
    const user = await this.service.signup(body);

    res.status(HttpStatus.CREATED).send({
      status: HttpStatus.CREATED,
      message: 'User created successfully',
      data: user,
    });
    return;
  }

  @Post('/verify-token')
  async verifyToken(
    @Body(new ValidationPipe()) body: VerifyTokenDTO,
    @Res() res: Response,
  ) {
    const result: boolean = await this.service.verifyToken(body.token);

    res.status(HttpStatus.CREATED).send({
      status: HttpStatus.CREATED,
      message: 'Token verify successfully',
      isValid: result,
    });
    return;
  }

  @Post('/signout')
  async signout(
    @Body(new ValidationPipe()) body: SignoutDTO,
    @Res() res: Response,
  ) {
    await this.service.singout(body.uid);

    res.status(HttpStatus.CREATED).send({
      status: HttpStatus.CREATED,
      message: 'signout successfully',
    });
    return;
  }
}
