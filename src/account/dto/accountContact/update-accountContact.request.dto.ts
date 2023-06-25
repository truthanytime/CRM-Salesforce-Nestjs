import { IsOptional, IsString } from 'class-validator';

export class UpdateAccountContactRequestDto {
  @IsOptional()
  @IsString()
  accountContactName: string;

  @IsOptional()
  @IsString()
  description: string;
}
