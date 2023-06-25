import { AccountContact } from '@/account/entities/accountContact.entity';
import { ContactInfoDto } from '@/user/dto/create-contactInfo.request.dto';
import { ContactType } from '../../types';

export class ContactResponseDto {
  contactId: number;
  ssid: string;
  firstName: string;
  middleName: string;
  lastName: string;
  title: string;
  image: string;
  contactSourceId: number;
  contactStatusId: number;
  contactStageId: number;
  contactType: ContactType;
  accountId: number;
  createDate: Date;
  updateDate: Date;
  workDepartmentId: number;
  reportsTo: number;
  createdBy: number;
  tenantUserId?: number;
  tenantUser?: {
    userId: number;
    userName: string;
    tenantId?: number;
  };
  contactInfo?: {
    contactContInfoId: number;
    phoneNumber?: string;
    mobileNumber?: string;
    country?: string;
    addressState?: string;
    street?: string;
    city?: string;
    zip?: string;
    email?: string;
  };
  account?: {
    accountId: number;
    accountName: string;
    description: string;
    company: string;
    webURL: string;
  };
}
