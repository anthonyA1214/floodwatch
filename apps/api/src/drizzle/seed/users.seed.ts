import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';
import { db } from './utils/db';
import * as schema from '../schemas/schema';

export async function seedUsers(length: number) {
  try {
    console.log('🌱 Seeding users...');

    const hash = await bcrypt.hash('password123', 10);

    const data = Array.from({ length: length }).map(() => ({
      email: faker.internet.email().toLowerCase(),
      hashedPassword: hash,
    }));

    await db.insert(schema.users).values(data);

    console.log('✅ Users seeded');
  } catch (err) {
    console.log('❌ Failed to seed users:', err);
  }
}
