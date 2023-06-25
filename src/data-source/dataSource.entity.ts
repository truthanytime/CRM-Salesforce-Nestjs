import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Integration } from '@/integration/integration.entity';
import { DataMigration } from '../data-migration/entities/dataMigration.entity';
import { DataSourceType } from '@/core/types';

@Entity()
export class DataSource {
  @PrimaryGeneratedColumn('uuid')
  dataSourceId: string;

  @Column({ unique: true })
  name: string;

  @Column()
  integrationId?: number;

  @Column({ enum: DataSourceType, default: DataSourceType.TENANT })
  type: string;

  @OneToOne(() => Integration, (integration) => integration.dataSource)
  @JoinColumn({ name: 'integration_id', referencedColumnName: 'applicationId' })
  integration?: Integration;

  @OneToMany(
    () => DataMigration,
    (userDataMigration) => userDataMigration.dataSource,
  )
  public userDataMigrations?: DataMigration[];
}
