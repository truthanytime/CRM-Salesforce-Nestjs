import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAccountStageRequestDto {
  @IsString()
  accountStageName: string;

  @IsString()
  description: string;
}
