import { IsOptional, IsString } from 'class-validator';

export class UpdateAccountStageRequestDto {
  @IsOptional()
  @IsString()
  accountStageName: string;

  @IsOptional()
  @IsString()
  description: string;
}
