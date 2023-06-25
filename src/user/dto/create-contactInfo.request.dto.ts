import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

export class ContactInfoDto {
  @IsString()
  addressState;

  @IsString()
  city;

  @IsString()
  country;

  @IsString()
  email;

  @IsString()
  mobileNumber;

  @IsString()
  phoneNumber;

  @IsString()
  street;

  @IsString()
  zip;
}
