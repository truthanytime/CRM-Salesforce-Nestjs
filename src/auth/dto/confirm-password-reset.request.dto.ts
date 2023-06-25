import { IsString } from 'class-validator';

export class ConfirmPasswordResetDto {
  @IsString()
  token: string;

  @IsString()
  password: string;
}
