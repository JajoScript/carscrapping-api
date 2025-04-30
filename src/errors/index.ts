import { HttpStatus } from '@nestjs/common';

export default class APIError extends Error {
  status: HttpStatus;

  constructor(message: string, status: HttpStatus) {
    super(message);

    this.status = status;
  }
}
