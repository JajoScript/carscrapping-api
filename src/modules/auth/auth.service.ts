import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { SignupDTO } from './DTOs';
import { Auth, UserRecord } from 'firebase-admin/auth';
import { UsersService } from '@/modules/users/users.service';
import APIError from '@/errors';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @Inject('FIREBASE_AUTH') private readonly auth: Auth,
    private readonly user: UsersService,
  ) {}

  // *-- Methods.
  async signup(payload: SignupDTO) {
    // 1. Verificar que el usuario no exista previamente.
    const prev: UserRecord | null = await this.auth
      .getUserByEmail(payload.email)
      .catch(() => null);

    if (prev) throw new APIError('User already exists', HttpStatus.BAD_REQUEST);

    // 2. Crear el usuario.
    const user: UserRecord = await this.auth.createUser({
      email: payload.email,
      password: payload.password,
      displayName: payload.name,
    });

    await this.user.create({
      userID: user.uid,
      email: payload.email ?? '',
      name: user?.displayName ?? '',
    });

    return user;
  }
}
