import { Inject, Injectable, Logger } from '@nestjs/common';
import { SignupDTO } from './DTOs';
import { Auth, UserRecord } from 'firebase-admin/auth';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(@Inject('FIREBASE_AUTH') private readonly auth: Auth) {}

  // *-- Methods.
  async signup(payload: SignupDTO) {
    // 1. Verificar que el usuario no exista previamente.
    const prev: UserRecord = await this.auth.getUserByEmail(payload.email);

    if (prev) throw new Error('User already exists');

    // 2. Crear el usuario.
    const user: UserRecord = await this.auth.createUser({
      email: payload.email,
      password: payload.password,
      displayName: payload.name,
    });

    return user;
  }

  async signin(payload: any) {}
}
