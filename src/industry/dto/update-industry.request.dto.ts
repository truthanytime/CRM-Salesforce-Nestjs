import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateIndustryRequestDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsNumber()
  code: string;

  @IsOptional()
  @IsString()
  description: string;
}
