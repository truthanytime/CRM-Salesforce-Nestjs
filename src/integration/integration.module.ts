import { AuthModule } from '@/auth/auth.module';
import { GoogleModule } from '@/core/lib/google/google.module';
import { SalesforceModule } from '@/core/lib/salesforce/salesforce.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntegrationStateRepository } from './integrationState.repository';
import { IntegrationController } from './integration.controller';
import { IntegrationRepository } from './integration.repository';
import { IntegrationService } from './integration.service';
import { UserRepository } from '@/user/repositories/user.repository';

@Module({
  imports: [
    AuthModule,
    GoogleModule,
    SalesforceModule,
    TypeOrmModule.forFeature([
      UserRepository,
      IntegrationRepository,
      IntegrationStateRepository,
    ]),
  ],
  providers: [IntegrationService],
  controllers: [IntegrationController],
  exports: [IntegrationService],
})
export class IntegrationModule {}
