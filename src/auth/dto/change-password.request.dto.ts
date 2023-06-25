import { IsEmail, IsString } from 'class-validator';

export class ChangePasswordRequestDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
