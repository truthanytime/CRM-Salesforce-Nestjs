import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateAccountRequestDto {
  @IsOptional()
  @IsString()
  accountName: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  company: string;

  @IsOptional()
  @IsString()
  webURL: string;

  @IsOptional()
  @IsString()
  industryId: number;

  @IsOptional()
  @IsString()
  foundedDate: Date;

  @IsOptional()
  @IsString()
  employeesNumber: number;

  @IsOptional()
  @IsString()
  revenuePerYear: number;

  @IsOptional()
  @IsNumber()
  childOf: number;

  @IsOptional()
  @IsBoolean()
  accountStatus: boolean;

  @IsOptional()
  @IsNumber()
  accountTypeId: number;

  @IsOptional()
  @IsNumber()
  accountStageId: number;

  @IsOptional()
  @IsString()
  createDate: Date;

  @IsOptional()
  @IsString()
  createdBy: number;
}
