import { Contact } from '@/contact/entities/contact.entity';

export class AccountResponseDto {
  accountId: number;
  accountName: string;
  description: string;
  accountTypeId: number;
  accountStageId: number;
  accountStatus: boolean;
  company: string;
  webURL: string;
  industryId: number;
  foundedDate: Date;
  employeesNumber: number;
  revenuePerYear: number;
  childOf: number;
  createDate: Date;
  updateDate: Date;
  createdBy: number;
  tenantUserId?: number;
  tenantUser?: {
    userId: number;
    userName: string;
  };
  contactInfo?: {
    accountContInfoId: number;
    phoneNumber?: string;
    mobileNumber?: string;
    country?: string;
    addressState?: string;
    street?: string;
    city?: string;
    zip?: string;
    email?: string;
  };
  contacts?: Contact[];
}
