import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class EmailActivityDetailDto {
  @IsString()
  emailFrom: string;

  @IsString()
  emailTo: string;

  @IsString()
  emailSubject: string;

  @IsString()
  emailBody: string;

  @IsOptional()
  @IsDate()
  emailDate: Date;

  @IsOptional()
  @IsDate()
  emailTime: Date;

  @IsBoolean()
  hasAttachment: boolean;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsNumber()
  replyToEmailId: number;

  @IsNumber()
  emailTypeId: number;
}
