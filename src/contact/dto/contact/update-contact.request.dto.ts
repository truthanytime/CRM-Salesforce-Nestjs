import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ContactType } from '../../types';

export class UpdateContactRequestDto {
  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  middleName?: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  @IsOptional()
  title: string;

  @IsEnum(ContactType)
  @IsOptional()
  contactType: ContactType;

  @IsString()
  @IsOptional()
  contactRole: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  secondaryEmail?: string;

  @IsNumber()
  @IsOptional()
  contactStageId?: number;

  @IsNumber()
  @IsOptional()
  contactStatusId?: number;

  @IsNumber()
  @IsOptional()
  contactSourceId?: number;

  @IsNumber()
  @IsOptional()
  accountId?: number;

  @IsString()
  @IsOptional()
  mobileNumber: string;

  @IsString()
  @IsOptional()
  phoneNumber: string;

  @IsString()
  @IsOptional()
  street: string;

  @IsString()
  @IsOptional()
  city: string;

  @IsString()
  @IsOptional()
  addressState: string;

  @IsString()
  @IsOptional()
  zip: string;

  @IsString()
  @IsOptional()
  country: string;
}
