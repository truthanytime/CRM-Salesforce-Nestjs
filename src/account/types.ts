export interface AccountContactInfoCreationAttributes {
  accountId: number;
  phoneNumber?: string;
  mobileNumber?: string;
  country?: string;
  zip?: string;
  addressState?: string;
  city?: string;
  street?: string;
  email?: string;
}
export interface AccountContactInfoUpdateAttributes {
  phoneNumber?: string;
  mobileNumber?: string;
  country?: string;
  zip?: string;
  addressState?: string;
  city?: string;
  street?: string;
  email?: string;
}
