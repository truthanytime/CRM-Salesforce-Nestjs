import { UserType } from '@/user/types';

export class CreateUserResponseDto {
  userId: number;
  userName: string;
  userEmail: string;
  userType: UserType;
  userActive: boolean;
  tenantId?: number;
  userCreatedAt: Date;
  userUpdatedAt: Date;
}
