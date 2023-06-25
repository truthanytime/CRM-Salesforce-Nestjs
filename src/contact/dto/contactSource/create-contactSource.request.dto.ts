import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateContactSourceRequestDto {
  @IsString()
  contactSourceName: string;

  @IsString()
  description: string;
}
