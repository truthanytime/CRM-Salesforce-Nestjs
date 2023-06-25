import { AccountContact } from '@/account/entities/accountContact.entity';
import { User } from '@/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class JobRoleForContact {
  @PrimaryGeneratedColumn()
  jobRoleForContactId: number;

  @Column()
  contactId: number;

  @Column()
  contactJobRoleId: number;

  @Column({ type: 'boolean' })
  isCurrent: boolean;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  endDate?: Date;
}
