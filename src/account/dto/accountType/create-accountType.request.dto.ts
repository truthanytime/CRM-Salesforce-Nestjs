import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAccountTypeRequestDto {
  @IsString()
  accountTypeName: string;

  @IsString()
  description: string;
}
