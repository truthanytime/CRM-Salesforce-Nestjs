import { Module } from '@nestjs/common';
import { GmailController } from './gmail.controller';
import { GmailService } from './gmail.service';
import { GoogleAuthService } from './google-auth.service';

@Module({
  controllers: [GmailController],
  providers: [GoogleAuthService, GmailService],
  exports: [GoogleAuthService, GmailService],
})
export class GoogleModule {}
