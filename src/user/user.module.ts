import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';
import { AuthModule } from '@/auth/auth.module';
import { ProfileModule } from '@/profile/profile.module';
import { MailModule } from '@/mail/mail.module';
import { UserRepository } from './repositories/user.repository';
import { UserContactInformationRepository } from './repositories/userContactInformation.repository';
import { UserPermissionRepository } from './repositories/userPermission.repository';
import { UserContactAttributeRepository } from './repositories/userContactAttribute.repository';
import { UserContactInformationService } from './services/userContactInformation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      UserContactInformationRepository,
      UserPermissionRepository,
      UserContactAttributeRepository,
    ]),
    forwardRef(() => AuthModule),
    ProfileModule,
    MailModule,
  ],
  providers: [UserService, UserContactInformationService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
