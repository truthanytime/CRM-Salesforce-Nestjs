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
export class DealTask {
  @PrimaryGeneratedColumn()
  dealTaskId: number;

  @Column()
  dealId: number;

  @Column()
  taskTitle: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  creatorTenantUserId: number;

  @Column({ type: 'boolean' })
  isDone: boolean;

  @Column({ type: 'timestamp', default: () => 'now()' })
  createdDate: Date;

  @Column({ type: 'timestamp' })
  taskDueDate: Date;
}
