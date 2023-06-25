import { IsString, IsNumber } from 'class-validator';

export class CreateIndustryRequestDto {
  @IsString()
  title: string;

  @IsNumber()
  code: string;

  @IsString()
  description: string;
}
