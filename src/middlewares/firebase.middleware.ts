import {
  Injectable,
  Logger,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { auth } from '@/modules/firebase/firebase.config';

@Injectable()
export class FirebaseAuthMiddleware implements NestMiddleware {
  private readonly logger = new Logger(FirebaseAuthMiddleware.name);

  async use(req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization;

    if (!header || !header.startsWith('Bearer ')) {
      throw new UnauthorizedException('No se proporcionó un token válido');
    }

    const idToken = header.split('Bearer ')[1];

    try {
      const decodedToken = await auth.verifyIdToken(idToken);
      req['user'] = decodedToken;
      next();
    } catch (err: unknown) {
      this.logger.error(err);
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}
