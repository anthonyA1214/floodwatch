import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from './types/auth-request.type';
import { SignUpDto, signUpSchema } from '@repo/schemas';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOne(email);
    if (!user) throw new ForbiddenException();

    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!passwordMatch) throw new UnauthorizedException();

    const { hashedPassword: _hashedPassword, ...result } = user;

    return result;
  }

  login(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(signUpData: SignUpDto) {
    const parsedData = signUpSchema.parse(signUpData);
    const { email, password, first_name, last_name, home_address } = parsedData;

    const user = await this.usersService.findOne(email);
    if (user) throw new BadRequestException('Email already in use');

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.usersService.createUser(
      email,
      hashedPassword,
      first_name,
      last_name,
      home_address,
    );

    return newUser;
  }
}
