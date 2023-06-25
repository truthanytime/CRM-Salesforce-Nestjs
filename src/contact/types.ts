export interface ContactContactInfoCreationAttributes {
  contactId: number;
  phoneNumber?: string;
  mobileNumber?: string;
  country?: string;
  zip?: string;
  addressState?: string;
  city?: string;
  street?: string;
  email?: string;
}
export interface ContactContactInfoUpdateAttributes {
  phoneNumber?: string;
  mobileNumber?: string;
  country?: string;
  zip?: string;
  addressState?: string;
  city?: string;
  street?: string;
  email?: string;
}

export enum ContactType {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}
