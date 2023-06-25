import { Module } from '@nestjs/common';
import { KmsManagerService } from './kms-manager.service';

@Module({
  providers: [KmsManagerService],
  exports: [KmsManagerService],
})
export class KmsModule {}
