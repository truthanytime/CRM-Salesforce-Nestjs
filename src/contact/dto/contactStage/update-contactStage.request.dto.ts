import { IsOptional, IsString } from 'class-validator';

export class UpdateContactStageRequestDto {
  @IsOptional()
  @IsString()
  contactStageName: string;

  @IsOptional()
  @IsString()
  description: string;
}
