import { User } from '@/user/entities/user.entity';
import { CreateUserResponseDto } from '../dto/create-user.response.dto';
import { UserResponseDto } from '../dto/user.response.dto';

export const userNormalizer = {
  getCreateUserResponseDto(user: User): CreateUserResponseDto {
    return {
      userId: user.userId,
      userName: user.userName,
      userEmail: user.userEmail,
      userType: user.userType,
      userActive: user.userActive,
      tenantId: user.tenantId,
      userCreatedAt: user.userCreatedAt,
      userUpdatedAt: user.userUpdatedAt,
    };
  },

  getUserResponseDto(user: User): UserResponseDto {
    return {
      userId: user.userId,
      userName: user.userName,
      userEmail: user.userEmail,
      userType: user.userType,
      userActive: user.userActive,
      tenantId: user.tenantId,
      userCreatedAt: user.userCreatedAt,
      userUpdatedAt: user.userUpdatedAt,
      contactInfo: user.contactInfo
        ? {
            userContInfoId: user.contactInfo.userContInfoId,
            mobileNumber: user.contactInfo.mobileNumber,
            phoneNumber: user.contactInfo.phoneNumber,
            // profileJobRole: user.contactInfo.profileJobRole,
          }
        : undefined,
    };
  },
};
