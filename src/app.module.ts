import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { TypeOrmModule } from '@nestjs/typeorm';

import { pinoLoggerConfig } from './config/logger.config';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { typeOrmConfig } from './config/orm.config';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { ProfileModule } from './profile/profile.module';
import { ContactModule } from './contact/contact.module';
import { AccountModule } from './account/account.module';
import { DealModule } from './deal/deal.module';
import { EmailModule } from './email/email.module';

import { PermissionModule } from './permission/permission.module';
import { TenantModule } from './tenant/tenant.module';
import { TenantUserJobRoleModule } from './tenantUserJobRole/tenantUserJobRole.module';
import { IndustryModule } from './industry/industry.module';
import { pipelineModule } from './pipeline/pipeline.module';
import { ActivityModule } from './activity/activity.module';
import { IntegrationModule } from './integration/integration.module';
import { FirebaseModule } from './core/lib/firebase/firebase.module';
import { BaseStageModule } from './basestage/basestage.module';
import { ResourceModule } from './resource/resource.module';
import { DataSourceModule } from './data-source/data-source.module';
import { DataMigrationModule } from './data-migration/data-migration.module';
import { SqsModule } from './core/lib/aws/sqs/sqs.module';
import { KmsModule } from './core/lib/aws/kms/kms.module';
import { DataRaptorModule } from './data-raptor/data-raptor.module';
import { OpenAIModule } from './open-ai/open-ai.module';

@Module({
  imports: [
    // LoggerModule.forRoot(pinoLoggerConfig),
    TypeOrmModule.forRoot(typeOrmConfig),
    FirebaseModule.forRoot({
      firestoreMainDoc: 'main',
    }),
    AuthModule,
    MailModule,
    ProductModule,
    ProfileModule,
    ContactModule,
    AccountModule,
    DealModule,
    EmailModule,
    UserModule,
    PermissionModule,
    TenantModule,
    TenantUserJobRoleModule,
    IndustryModule,
    pipelineModule,
    ResourceModule,
    ActivityModule,
    IntegrationModule,
    BaseStageModule,
    DataSourceModule,
    DataMigrationModule,
    SqsModule,
    KmsModule,
    DataRaptorModule,
    OpenAIModule,
  ],
})
export class AppModule {}
