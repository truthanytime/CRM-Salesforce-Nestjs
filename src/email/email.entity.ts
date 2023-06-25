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
export class Email {
  @PrimaryGeneratedColumn()
  emailId: number;

  @Column()
  emailFrom: string;

  @Column()
  emailTo: string;

  @Column()
  emailSubject: string;

  @Column()
  emailContent: string;

  @Column({ type: 'timestamp', default: () => 'now()' })
  emailCreatedAt: Date;
}
