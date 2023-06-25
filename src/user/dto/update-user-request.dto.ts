import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { UserType } from '../types';

export class UpdateUserRequestDto {
  @IsString()
  @IsOptional()
  userName?: string;

  @IsEmail()
  @IsOptional()
  userEmail?: string;

  @IsEnum(UserType)
  @IsOptional()
  userType?: UserType;

  @IsString()
  @IsOptional()
  tenantId?: number;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  mobileNumber?: string;

  // @IsString()
  // @IsOptional()
  // profileJobRole?: string;
}
