export enum UserType {
  SUPER_ADMIN = 'super_admin',
  PLATFORM_USER = 'admin',
  TENANT_USER = 'owner',
  // ADMIN = 'admin',
  // OWNER = 'owner',
  USER = 'user',
}

export enum Gender {
  MALE = 'mail',
  FEMALE = 'female',
  OTHER = 'other',
}

export interface UserContactInfoCreationAttributes {
  userId: number;
  phoneNumber?: string;
  mobileNumber?: string;
  // profileJobRole?: string;
}

export interface UserContactInfoUpdateAttributes {
  phoneNumber?: string;
  mobileNumber?: string;
  // profileJobRole?: string;
}

export enum AddressType {
  MAILING = 'mailing',
  BUSINESS = 'business',
}
