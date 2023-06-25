import { IsOptional, IsString, IsNumber, IsDate } from 'class-validator';

export class UpdateDealRequestDto {
  @IsOptional()
  @IsString()
  dealName: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  pipelineId: number;

  @IsOptional()
  @IsNumber()
  tenantId: number;

  @IsOptional()
  @IsNumber()
  tenantUserId: number;

  @IsOptional()
  @IsNumber()
  accountId: number;

  @IsOptional()
  @IsNumber()
  contactId: number;

  @IsOptional()
  @IsNumber()
  campaignId: number;

  @IsOptional()
  @IsNumber()
  totalAmount: number;

  @IsOptional()
  @IsString()
  currency: string;

  @IsOptional()
  @IsDate()
  startDate: Date;

  @IsOptional()
  @IsDate()
  endDate: Date;
}
