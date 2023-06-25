import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  Migration,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { RuleCategory, RuleRiskLevel, RuleStatus } from './../types';
import { RuleDto } from '../dto/rule.dto';
import { DataMigration } from '@/data-migration/entities/dataMigration.entity';
import { Exclude } from 'class-transformer';

@Entity()
@Unique(['dataMigrationId', 'table', 'name'])
export class Rule {
  @PrimaryGeneratedColumn('uuid')
  ruleId: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  table: string;

  @Column({ type: 'json', nullable: false })
  rule: RuleDto;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Exclude()
  @Column({ type: 'json', nullable: false })
  formattedRule: RuleDto;

  @Exclude()
  @Column({ type: 'json', nullable: true })
  previousFormattedRule: RuleDto;

  @Column({ type: 'json', nullable: true })
  frontEndObject: any;

  @Column({ nullable: false })
  dataMigrationId: string;

  @ManyToOne(() => DataMigration, (dataMigration) => dataMigration.rules, {
    nullable: true,
  })
  @JoinColumn({
    name: 'migration_id',
    referencedColumnName: 'dataMigrationId',
  })
  migration?: Migration;

  @Column({ nullable: false, precision: 3, type: 'decimal' })
  violationScore: number;

  @Column({ default: RuleStatus.REQUESTED })
  status: RuleStatus;

  @Column({ default: RuleCategory.DataValidation })
  category: RuleCategory;

  @Column({ default: RuleRiskLevel.Medium })
  riskLevel: RuleRiskLevel;

  @Column({ type: 'timestamp', default: () => 'now()' })
  statusDate: Date;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @Exclude()
  @DeleteDateColumn()
  public deletedAt: Date;

  @Column({ type: "integer", nullable: false, default: 0 })
  violatedRowCount: number;
}
