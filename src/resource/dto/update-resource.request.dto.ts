import { IsArray, IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateResourceRequestDto {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  dataType: string;
}
