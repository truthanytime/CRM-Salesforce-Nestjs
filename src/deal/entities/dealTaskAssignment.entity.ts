import { Account } from '@/account/entities/account.entity';
import { User } from '@/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class DealTaskAssignment {
  @PrimaryGeneratedColumn()
  dealTaskAssignmentId: number;

  @Column()
  dealTaskId: number;

  @Column()
  assignerTenantUserId: number;

  @Column()
  assigneeTenantUserId: number;

  @Column({ type: 'timestamp' })
  assignDate: Date;
}
