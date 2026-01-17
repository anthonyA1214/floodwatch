import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async findOne(email: string, password: string) {
    const user = await this.usersService.findOne(email);
    if (!user) throw new UnauthorizedException();

    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!passwordMatch) throw new UnauthorizedException();

    const { hashedPassword: _hashedPassword, ...result } = user;

    return result;
  }
}
