import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourceService } from './services/resource.service';
import { ResourceController } from './resource.controller';
import { ResourceRepository } from './repositories/resource.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ResourceRepository])],
  providers: [ResourceService],
  controllers: [ResourceController],
})
export class ResourceModule {}
