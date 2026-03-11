import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CommentQueryInput,
  CreateCommentInput,
  UpdateCommentDto,
} from '@repo/schemas';
import { and, desc, eq, lt, sql } from 'drizzle-orm';
import { User } from 'src/auth/types/auth-request.type';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { DRIZZLE } from 'src/drizzle/drizzle-connection';
import {
  commentReports,
  comments,
  profileInfo,
  reports,
  users,
} from 'src/drizzle/schemas';
import { type DrizzleDB } from 'src/drizzle/types/drizzle';
import { ImagesService } from 'src/images/images.service';

@Injectable()
export class CommentsService {
  constructor(
    @Inject(DRIZZLE) private db: DrizzleDB,
    private imagesService: ImagesService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async getComments(reportId: number, commentQueryDto: CommentQueryInput) {
    const { cursor, limit } = commentQueryDto;

    const commentsList = await this.db
      .select({
        id: comments.id,
        content: comments.content,
        image: comments.image,
        reportsCount: sql<number>`(SELECT COUNT(*) FROM ${commentReports} WHERE ${commentReports.commentId} = ${comments.id})`,
        createdAt: comments.createdAt,
        author: {
          id: users.id,
          name: sql<string>`CONCAT(${profileInfo.firstName}, ' ', ${profileInfo.lastName})`,
          profilePicture: profileInfo.profilePicture,
        },
      })
      .from(comments)
      .leftJoin(users, eq(comments.userId, users.id))
      .leftJoin(profileInfo, eq(users.id, profileInfo.userId))
      .where(
        cursor
          ? and(
              eq(comments.reportId, reportId),
              lt(comments.createdAt, new Date(cursor)),
            )
          : eq(comments.reportId, reportId),
      )
      .orderBy(desc(comments.createdAt))
      .limit(limit + 1);

    const hasMore = commentsList.length > limit;
    const data = hasMore ? commentsList.slice(0, limit) : commentsList;
    const nextCursor =
      hasMore && data.length > 0
        ? (data[data.length - 1].createdAt?.toISOString() ?? null)
        : null;

    return { data, meta: { hasMore, nextCursor } };
  }

  async addComment(
    reportId: number,
    createCommentDto: CreateCommentInput,
    userId: number,
    image: Express.Multer.File,
  ) {
    const { content } = createCommentDto;

    if (!content && !image) {
      throw new BadRequestException('Content or image is required');
    }

    const report = await this.db
      .select()
      .from(reports)
      .where(eq(reports.id, reportId))
      .limit(1);

    if (!report.length) throw new NotFoundException('Report not found');

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
        'comments',
      );

      imageUrl = uploaded.secure_url as string;
      imagePublicId = uploaded.public_id as string;
    }

    const [comment] = await this.db
      .insert(comments)
      .values({
        content,
        reportId,
        userId,
        image: imageUrl,
        imagePublicId,
      })
      .returning();

    return comment;
  }

  async updateComment(
    commentId: number,
    updateCommentDto: UpdateCommentDto,
    userId: number,
    image: Express.Multer.File,
  ) {
    const [comment] = await this.db
      .select()
      .from(comments)
      .where(eq(comments.id, commentId))
      .limit(1);

    if (!comment) throw new NotFoundException('Comment not found');

    if (comment.userId !== userId) {
      throw new ForbiddenException(
        'You are not allowed to update this comment',
      );
    }

    const { content, removeImage } = updateCommentDto;

    let imageUrl = comment.image;
    let imagePublicId = comment.imagePublicId;

    if (removeImage && !image) {
      // if the user wants to remove the image
      if (imagePublicId) {
        await this.cloudinaryService.deleteImage(imagePublicId);
      }
      imageUrl = null;
      imagePublicId = null;
    } else if (image) {
      // if the user wants to update the image
      if (imagePublicId) {
        await this.cloudinaryService.deleteImage(imagePublicId);
      }

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
        'comments',
      );

      imageUrl = uploaded.secure_url as string;
      imagePublicId = uploaded.public_id as string;
    }

    const [updatedComment] = await this.db
      .update(comments)
      .set({
        content,
        image: imageUrl,
        imagePublicId,
        updatedAt: new Date(),
      })
      .where(eq(comments.id, commentId))
      .returning();

    return updatedComment;
  }

  async deleteComment(commentId: number, user: User) {
    const [comment] = await this.db
      .select()
      .from(comments)
      .where(eq(comments.id, commentId))
      .limit(1);

    if (!comment) throw new NotFoundException('Comment not found');

    if (comment.userId === user.id || user.role === 'admin') {
      if (comment.imagePublicId) {
        await this.cloudinaryService.deleteImage(comment.imagePublicId);
      }

      await this.db.delete(comments).where(eq(comments.id, commentId));

      return { message: 'Comment deleted successfully' };
    } else {
      throw new ForbiddenException(
        'You are not allowed to delete this comment',
      );
    }
  }
}
