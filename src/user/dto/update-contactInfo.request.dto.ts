import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateContactInfoDto {
  @IsString()
  @IsOptional()
  addressState;

  @IsString()
  @IsOptional()
  city;

  @IsString()
  @IsOptional()
  country;

  @IsString()
  @IsOptional()
  email;

  @IsString()
  @IsOptional()
  mobileNumber;

  @IsString()
  @IsOptional()
  phoneNumber;

  @IsString()
  @IsOptional()
  street;

  @IsString()
  @IsOptional()
  zip;
}
