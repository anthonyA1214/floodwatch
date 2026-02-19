import { Inject, Injectable } from '@nestjs/common';
import { CreateFloodReportInput } from '@repo/schemas';
import { DRIZZLE } from 'src/drizzle/drizzle-connection';
import { reports } from 'src/drizzle/schemas/reports.schema';
import type { DrizzleDB } from 'src/drizzle/types/drizzle';

@Injectable()
export class ReportsService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async createReport(
    userId: number,
    createFloodReportDto: CreateFloodReportInput,
  ) {
    const {
      latitude,
      longitude,
      location,
      range,
      description,
      image,
      severity,
    } = createFloodReportDto;

    const report = await this.db.insert(reports).values({
      userId,
      latitude,
      longitude,
      location,
      range,
      description: description || null,
      image: image || null,
      severity,
    });

    return report;
  }
}
