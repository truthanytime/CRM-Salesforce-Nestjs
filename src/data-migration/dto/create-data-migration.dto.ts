import { IsUUID, UUIDVersion } from 'class-validator';

export class CreateDataMigrationDto {
  @IsUUID()
  dataSourceId: string;
}
