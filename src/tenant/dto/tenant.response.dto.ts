import { TenantContactInformation } from '../entities/tenantContactInformation.entity';

export class TenantResponseDto {
  tenantId: number;
  tenantName: string;
  // industryId: number;
  webURL: string;
  employeesNumber: string;
  suggestedDomain: string;
  subscriptionDate: Date;
  createDate: Date;
  ownerId: number;
  ownerName: string;
  ownerEmail: string;
  contactInfo?: TenantContactInformation;
  billingContactInfo?: TenantContactInformation;
}
