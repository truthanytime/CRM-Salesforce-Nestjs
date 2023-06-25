import { IsOptional, IsString } from 'class-validator';

export class UpdateAccountTypeRequestDto {
  @IsOptional()
  @IsString()
  accountTypeName: string;

  @IsOptional()
  @IsString()
  description: string;
}
