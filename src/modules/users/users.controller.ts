import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import type { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get('/:email')
  async getUserByEmail(@Param('email') email: string, @Res() res: Response) {
    const user = await this.service.getByEmail(email);
    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: 'User fetched successfully',
      data: user,
    });
    return;
  }
}
