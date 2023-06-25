import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateContactStageRequestDto {
  @IsString()
  contactStageName: string;

  @IsString()
  description: string;
}
