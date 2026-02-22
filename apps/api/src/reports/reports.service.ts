import { Inject, Injectable } from '@nestjs/common';
import { ReportFloodAlertInput } from '@repo/schemas';
import { desc, eq } from 'drizzle-orm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { DRIZZLE } from 'src/drizzle/drizzle-connection';
import { profileInfo, users } from 'src/drizzle/schemas';
import { reports } from 'src/drizzle/schemas/reports.schema';
import type { DrizzleDB } from 'src/drizzle/types/drizzle';
import { GeocoderService } from 'src/geocoder/geocoder.service';
import { ImagesService } from 'src/images/images.service';

@Injectable()
export class ReportsService {
  constructor(
    @Inject(DRIZZLE) private db: DrizzleDB,
    private imagesService: ImagesService,
    private cloudinaryService: CloudinaryService,
    private geocoderService: GeocoderService,
  ) {}

  async findAll() {
    const reportsList = await this.db
      .select()
      .from(reports)
      .leftJoin(profileInfo, eq(profileInfo.userId, reports.userId))
      .leftJoin(users, eq(users.id, reports.userId))
      .orderBy(desc(reports.createdAt));

    return reportsList.map(({ reports, profile_info, users }) => ({
      id: reports.id,
      userId: reports.userId,
      name: `${profile_info?.firstName ?? ''} ${profile_info?.lastName ?? ''}`.trim(),
      email: users?.email,
      profilePicture: profile_info?.profilePicture,
      severity: reports.severity,
      status: reports.status,
      description: reports.description,
      range: reports.range,
      longitude: reports.longitude,
      latitude: reports.latitude,
      location: reports.location,
      image: reports.image,
      reportedAt: reports.createdAt,
    }));
  }

  async createReport(
    userId: number,
    reportFloodAlertDto: ReportFloodAlertInput,
    image: Express.Multer.File,
  ) {
    const { latitude, longitude, severity, description, range } =
      reportFloodAlertDto;

    let imageUrl: string | null = null;
    let imagePublicId: string | null = null;

    if (image) {
      const { buffer, mimetype } = await this.imagesService.normalizeImage(
        image.buffer,
      );

      const normalizedFile: Express.Multer.File = {
        ...image,
        buffer,
        mimetype,
        originalname: image.originalname.replace(
          /\.(jpe?g|png|jfif|webp)$/i,
          '.webp',
        ),
      };

      const uploaded = await this.cloudinaryService.uploadImage(
        normalizedFile,
        'reports',
      );

      imageUrl = uploaded.secure_url as string;
      imagePublicId = uploaded.public_id as string;
    }

    const displayName = await this.geocoderService.reverseGeocode(
      latitude,
      longitude,
    );

    await this.db.insert(reports).values({
      userId,
      latitude,
      longitude,
      severity,
      description,
      range,
      image: imageUrl,
      imagePublicId,
      location: displayName,
    });
  }
}
