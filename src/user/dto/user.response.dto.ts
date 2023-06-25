import { UserType } from '@/user/types';
export class UserResponseDto {
  userId: number;
  userName: string;
  userEmail: string;
  userType: UserType;
  userActive: boolean;
  tenantId?: number;
  userCreatedAt: Date;
  userUpdatedAt: Date;
  contactInfo?: {
    userContInfoId: number;
    phoneNumber?: string;
    mobileNumber?: string;
    // profileJobRole?: string;
  };
}
