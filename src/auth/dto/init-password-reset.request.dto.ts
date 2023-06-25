import { IsEmail } from 'class-validator';

export class InitPasswordResetRequestDto {
  @IsEmail()
  email: string;
}
