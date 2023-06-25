import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateResourceRequestDto {
  @IsString()
  name: string;

  @IsNumber()
  pipelineId: number;

  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  dataType: string;
}
