import { IsString, IsNumber } from 'class-validator';

export class CreateEmailRequestDto {
  @IsString()
  emailFrom: string;

  @IsString()
  emailTo: string;

  @IsString()
  emailSubject: string;

  @IsString()
  emailContent: string;
}
