import { IsString } from 'class-validator';

export class CreatePermissionRequestDto {
  @IsString()
  title: string;

  @IsString()
  code: string;

  @IsString()
  description: string;
}
