import { IsString } from 'class-validator';

export class CreateTenantUserJobRoleRequestDto {
  @IsString()
  title: string;

  @IsString()
  code: string;

  @IsString()
  description: string;
}
