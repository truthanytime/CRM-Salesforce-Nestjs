import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantUserJobRoleService } from './tenantUserJobRole.service';
import { TenantUserJobRoleController } from './tenantUserJobRole.controller';
import { TenantUserJobRoleRepository } from './repositories/tenantUserJobRole.repository';
import { JobRoleForTenantUserRepository } from './repositories/jobRoleForTenantUser.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TenantUserJobRoleRepository,
      JobRoleForTenantUserRepository,
    ]),
  ],
  providers: [TenantUserJobRoleService],
  controllers: [TenantUserJobRoleController],
})
export class TenantUserJobRoleModule {}
