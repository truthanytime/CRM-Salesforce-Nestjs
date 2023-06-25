import { IsOptional, IsString } from 'class-validator';

export class UpdateContactStatusRequestDto {
  @IsOptional()
  @IsString()
  contactStatusName: string;

  @IsOptional()
  @IsString()
  description: string;
}
