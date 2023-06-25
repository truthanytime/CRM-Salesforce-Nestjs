import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from '@/mail/mail.module';
import { UserModule } from '@/user/user.module';
import { PasswordResetTokenRepository } from './repositories/password-reset-token.repository';
import { JwtParamsStrategy } from './jwt-params.strategy';
import { WSAuthGuard } from './guards/WSAuthGuard';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([PasswordResetTokenRepository]),
    MailModule,
    UserModule,
  ],
  providers: [AuthService, JwtStrategy, JwtParamsStrategy, WSAuthGuard],
  controllers: [AuthController],
  exports: [JwtStrategy, JwtParamsStrategy, AuthService, WSAuthGuard],
})
export class AuthModule {}
