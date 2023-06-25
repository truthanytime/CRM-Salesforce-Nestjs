import { UpdateContactInfoDto } from '@/user/dto/update-contactInfo.request.dto';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class UpdateTenantRequestDto {
  @IsString()
  @IsOptional()
  tenantName: string;

  @IsString()
  @IsOptional()
  userName?: string;

  @IsEmail()
  @IsOptional()
  userEmail?: string;

  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => UpdateContactInfoDto)
  contactInfo: UpdateContactInfoDto;

  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => UpdateContactInfoDto)
  billingContactInfo: UpdateContactInfoDto;
}
