import { IsString, IsNumber } from 'class-validator';

export class CreateDealRequestDto {
  @IsString()
  dealName: string;
}
