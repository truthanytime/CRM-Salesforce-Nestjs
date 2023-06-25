import { ContactInfoDto } from '@/user/dto/create-contactInfo.request.dto';
import { Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateAccountRequestDto {
  @IsString()
  accountName: string;

  @IsString()
  description: string;

  @IsNumber()
  revenuePerYear: number;

  @IsNumber()
  @IsOptional()
  accountTypeId: number;

  // @IsNumber()
  // industryId: number;

  @ValidateNested({ each: true })
  @Type(() => ContactInfoDto)
  contactInfo: ContactInfoDto;
}
