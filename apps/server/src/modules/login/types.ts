import { Prisma } from '@prisma/client';

export interface JWTPayload {
  user_id: number;
  username: string;
  metadata: Prisma.JsonValue;
  is_active: boolean;
}
