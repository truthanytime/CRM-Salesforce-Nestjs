import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

import { UserType } from '../types';

export class CreateUserRequestDto {
  @IsString()
  userName: string;

  @IsEmail()
  userEmail: string;

  @IsEnum(UserType)
  userType: UserType;

  @IsString()
  phoneNumber: string;

  @IsString()
  @IsOptional()
  mobileNumber?: string;

  @IsString()
  @IsOptional()
  profileJobRole?: string;
}
