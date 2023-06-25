import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { PermissionRepository } from './permission.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionRepository])],
  providers: [PermissionService],
  controllers: [PermissionController],
})
export class PermissionModule {}
