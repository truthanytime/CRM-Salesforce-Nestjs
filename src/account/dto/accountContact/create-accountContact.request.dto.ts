import { IsNumber } from 'class-validator';

export class CreateAccountContactRequestDto {
  @IsNumber()
  accountId: number;

  @IsNumber()
  contactId: number;
}
