import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateContactStatusRequestDto {
  @IsString()
  contactStatusName: string;

  @IsString()
  description: string;
}
