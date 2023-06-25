import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
  Index,
} from 'typeorm';
import { EmailActivityDetail } from './emailActivityDetail.entity';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  activityId: number;

  @Column()
  salePhaseId: number;

  @Column({ nullable: true })
  dealId: number;

  @Column({ nullable: true })
  tenantId: number;

  @Column()
  tenantUserId: number;

  @Column()
  accountId: number;

  @Index()
  @Column()
  contactId: number;

  @Column()
  activityTypeId: number;

  @Column({
    type: 'timestamp',
    nullable: true,
    default: () => 'now()',
  })
  startDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  dueDate: Date;

  @Column({ nullable: true })
  status: string;

  @Column()
  contactStageId: number;

  @Index()
  @Column()
  emailActivityThreadId: string;

  @OneToMany(
    () => EmailActivityDetail,
    (emailActivityDetail) => emailActivityDetail.activity,
  )
  emailActivityDetails?: EmailActivityDetail[];
}
