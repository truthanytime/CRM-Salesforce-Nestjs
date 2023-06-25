import { IsOptional, IsString } from 'class-validator';

export class UpdateActivityRequestDto {
  @IsOptional()
  @IsString()
  salePhaseId: number;

  @IsOptional()
  @IsString()
  dealId: number;

  @IsOptional()
  @IsString()
  tenantId: number;

  @IsOptional()
  @IsString()
  tenantUserId: number;

  @IsOptional()
  @IsString()
  accountId: number;

  @IsOptional()
  @IsString()
  contactId: number;

  @IsOptional()
  @IsString()
  activityTypeId: number;

  @IsOptional()
  @IsString()
  startDate: Date;

  @IsOptional()
  @IsString()
  dueDate: Date;

  @IsOptional()
  @IsString()
  status: string;
}
