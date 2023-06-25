import { AddressType } from '@/user/types';

export interface TenantContactInfoCreationAttributes {
  tenantId: number;
  addressType: AddressType;
  phoneNumber?: string;
  mobileNumber?: string;
  country?: string;
  zip?: string;
  addressState?: string;
  city?: string;
  street?: string;
  email?: string;
}
export interface TenantContactInfoUpdateAttributes {
  phoneNumber?: string;
  mobileNumber?: string;
  country?: string;
  zip?: string;
  addressState?: string;
  city?: string;
  street?: string;
  email?: string;
}
