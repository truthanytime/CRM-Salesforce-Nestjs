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
export class DealNote {
  @PrimaryGeneratedColumn()
  dealNoteId: number;

  @Column()
  dealId: number;

  @Column()
  noteTitle: string;

  @Column()
  noteText: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  ownerTenantUserId: number;

  @Column({ type: 'timestamp', default: () => 'now()' })
  createdDate: Date;
}
