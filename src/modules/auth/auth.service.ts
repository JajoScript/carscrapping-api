import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { SignupDTO } from './DTOs';
import {
  Auth,
  DecodedIdToken,
  FirebaseAuthError,
  UserRecord,
} from 'firebase-admin/auth';
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

  async verifyToken(token: string): Promise<boolean> {
    try {
      const isValid: boolean = await this.auth
        .verifyIdToken(token, true)
        .then((decoded: DecodedIdToken) => {
          this.logger.debug(decoded);
          return true;
        })
        .catch((err: FirebaseAuthError) => {
          if (err.code === 'auth/id-token-expired') {
            return false;
          }

          if (err.code === 'auth/id-token-revoked') {
            return false;
          }

          throw err;
        });

      return isValid;
    } catch (err: unknown) {
      this.logger.error(err);
      throw err;
    }
  }

  async singout(uid: string): Promise<void> {
    try {
      await this.auth.revokeRefreshTokens(uid);

      return;
    } catch (err: unknown) {
      this.logger.error(err);
      throw err;
    }
  }
}
