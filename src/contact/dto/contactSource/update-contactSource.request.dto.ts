import { IsOptional, IsString } from 'class-validator';

export class UpdateContactSourceRequestDto {
  @IsOptional()
  @IsString()
  contactSourceName: string;

  @IsOptional()
  @IsString()
  description: string;
}
