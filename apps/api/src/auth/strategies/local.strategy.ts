import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { logInSchema } from '@repo/schemas';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const result = logInSchema.safeParse({ email, password });
    if (!result.success) throw new UnauthorizedException('Invalid credentials');

    const user = await this.authService.validateUser(email, password);

    if (!user) throw new UnauthorizedException('Invalid credentials');
    if (user.status === 'blocked')
      throw new ForbiddenException('User is blocked');

    return user;
  }
}
