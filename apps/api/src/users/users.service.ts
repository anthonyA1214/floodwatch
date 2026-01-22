import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE } from '../drizzle/drizzle-connection';
import { type DrizzleDB } from '../drizzle/types/drizzle';
import { users } from 'src/drizzle/schemas/users.schema';
import { eq } from 'drizzle-orm';
import { profileInfo } from 'src/drizzle/schemas/profile-info.schema';

@Injectable()
export class UsersService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async findOne(email: string) {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return user;
  }

  async createUser(
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    home_address: string,
  ) {
    const [newUser] = await this.db
      .insert(users)
      .values({ email, hashedPassword: password })
      .returning();

    const [newProfile] = await this.db
      .insert(profileInfo)
      .values({
        userId: newUser.id,
        firstName: first_name,
        lastName: last_name,
        homeAddress: home_address,
      })
      .returning();

    return { ...newUser, profile: newProfile };
  }
}
