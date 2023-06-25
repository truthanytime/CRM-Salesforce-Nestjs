import { IsOptional, IsString } from 'class-validator';

export class UpdatePermissionRequestDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  code: string;

  @IsOptional()
  @IsString()
  description: string;
}
