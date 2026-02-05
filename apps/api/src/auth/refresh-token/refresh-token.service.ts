import { Inject, Injectable } from '@nestjs/common';
import { eq, and } from 'drizzle-orm';
import { DRIZZLE } from 'src/drizzle/drizzle-connection';
import { refreshTokens } from 'src/drizzle/schemas/refresh-tokens.schema';
import { type DrizzleDB } from 'src/drizzle/types/drizzle';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RefreshTokenService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async setRefreshToken(
    userId: number,
    deviceId: string,
    hashedToken: string,
    expiresAt: Date,
  ) {
    await this.db
      .insert(refreshTokens)
      .values({
        userId,
        deviceId,
        hashedToken,
        expiresAt,
      })
      .onConflictDoUpdate({
        target: [refreshTokens.userId, refreshTokens.deviceId],
        set: {
          hashedToken,
          expiresAt,
          updatedAt: new Date(),
        },
      });
  }

  async getRefreshToken(userId: number, deviceId: string) {
    return await this.db
      .select()
      .from(refreshTokens)
      .where(
        and(
          eq(refreshTokens.userId, userId),
          eq(refreshTokens.deviceId, deviceId),
        ),
      )
      .limit(1);
  }

  async removeRefreshToken(userId: number, deviceId: string) {
    return await this.db
      .delete(refreshTokens)
      .where(
        and(
          eq(refreshTokens.userId, userId),
          eq(refreshTokens.deviceId, deviceId),
        ),
      );
  }

  async validateRefreshToken(userId: number, deviceId: string, token: string) {
    const [record] = await this.getRefreshToken(userId, deviceId);
    if (!record) return false;
    return await bcrypt.compare(token, record.hashedToken);
  }
}
