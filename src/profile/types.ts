export interface ProfileCreationAttributes {
  userId: number;
  workPhoneNumber: string;
  additionalPhoneNumber?: string;
  profileJobRole?: string;
}

export interface ProfileUpdateAttributes {
  workPhoneNumber?: string;
  additionalPhoneNumber?: string;
  profileJobRole?: string;
}
