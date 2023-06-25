import { IntegrationRepository } from '@/integration/integration.repository';
import { IntegrationStateRepository } from '@/integration/integrationState.repository';
import { UserRepository } from '@/user/repositories/user.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesforceAuthService } from './salesforce-auth.service';
import { KmsModule } from '@/core/lib/aws/kms/kms.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      IntegrationRepository,
      IntegrationStateRepository,
    ]),
    KmsModule,
  ],
  providers: [SalesforceAuthService],
  exports: [SalesforceAuthService],
})
export class SalesforceModule {}
