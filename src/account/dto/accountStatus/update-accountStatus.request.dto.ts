import { IsOptional, IsString } from 'class-validator';

export class UpdateAccountStatusRequestDto {
  @IsOptional()
  @IsString()
  accountStatusName: string;

  @IsOptional()
  @IsString()
  description: string;
}
