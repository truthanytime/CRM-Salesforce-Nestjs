import { IsEmail, IsString } from 'class-validator';

export class SetPasswordRequestDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  session: string;
}
