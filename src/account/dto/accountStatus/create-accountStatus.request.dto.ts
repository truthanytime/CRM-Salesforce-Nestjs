import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAccountStatusRequestDto {
  @IsString()
  accountStatusName: string;

  @IsString()
  description: string;
}
