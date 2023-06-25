import { RecordUpdate } from '../../../../../data-migration/dto/post-migration-record-update.dto';

export class DataSynchronizerSqsMessageDto {
  userId: number;
  tenantId: number;
  migrationId: string;
  dataSourceId: string;
  updates: RecordUpdate[];
}
