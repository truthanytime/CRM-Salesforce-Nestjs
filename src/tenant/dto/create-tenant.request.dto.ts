import { ContactInfoDto } from '@/user/dto/create-contactInfo.request.dto';
import { Gender } from '@/user/types';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateTenantRequestDto {
  @IsString()
  tenantName: string;

  @ValidateNested({ each: true })
  @Type(() => ContactInfoDto)
  contactInfo: ContactInfoDto;

  @ValidateNested({ each: true })
  @Type(() => ContactInfoDto)
  billingContactInfo: ContactInfoDto;

  @IsString()
  ownerName: string;

  @IsString()
  ownerEmail: string;
}
