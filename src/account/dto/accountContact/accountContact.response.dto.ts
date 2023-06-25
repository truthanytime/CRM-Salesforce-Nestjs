import { ContactResponseDto } from '@/contact/dto/contact/contact.response.dto';
import { AccountResponseDto } from '../account/account.response.dto';

export class AccountContactResponseDto {
  accountContactId: number;
  accountId: number;
  contactId: number;
  isPrimary: boolean;
  startDate: Date;
  endDate?: Date;
  Account?: AccountResponseDto;
  Contact?: ContactResponseDto;
}
