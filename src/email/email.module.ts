import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { EmailRepository } from './email.repository';
import { GoogleModule } from '@/core/lib/google/google.module';

@Module({
  imports: [TypeOrmModule.forFeature([EmailRepository]), GoogleModule],
  providers: [EmailService],
  controllers: [EmailController],
})
export class EmailModule {}
