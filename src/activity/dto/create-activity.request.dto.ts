import { Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ACTIVITY_TYPE_ID } from '../types';
import { EmailActivityDetailDto } from './emailActivityDetail.dto';

export class CreateActivityRequestDto {
  @IsNumber()
  salePhaseId: number;

  @IsOptional()
  @IsNumber()
  dealId: number;

  @IsOptional()
  @IsNumber()
  tenantId: number;

  @IsNumber()
  accountId: number;

  @IsNumber()
  contactId: number;

  @IsNumber()
  activityTypeId: ACTIVITY_TYPE_ID;

  @IsString()
  status: string;

  @IsNumber()
  contactStageId: number;

  @Type(() => EmailActivityDetailDto)
  @ValidateNested({ each: true })
  emailActivityDetail!: EmailActivityDetailDto;
}
