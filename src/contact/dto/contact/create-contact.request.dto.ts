import { ContactInfoDto } from '@/user/dto/create-contactInfo.request.dto';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ContactType } from '../../types';

export class CreateContactRequestDto {
  @IsString()
  firstName: string;

  @IsString()
  @IsOptional()
  middleName?: string;

  @IsString()
  lastName: string;

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  contactRole: string;

  @IsEnum(ContactType)
  @IsOptional()
  contactType: ContactType;

  @IsNumber()
  @IsOptional()
  contactStageId?: number;

  @ValidateNested({ each: true })
  @Type(() => ContactInfoDto)
  contactInfo: ContactInfoDto;
}
