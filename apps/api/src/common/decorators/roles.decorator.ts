import { SetMetadata } from '@nestjs/common';
import { roleEnum } from 'src/drizzle/schemas';

export type Role = (typeof roleEnum.enumValues)[number];

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
