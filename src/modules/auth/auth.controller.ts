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
import { SigninDTO, SignupDTO } from './DTOs';

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

  @Post('/signin')
  async signin(
    @Body(new ValidationPipe()) body: SigninDTO,
    @Res() res: Response,
  ) {
    await this.service.signin(body);

    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: 'User signed in successfully',
      data: null,
    });
    return;
  }
}
