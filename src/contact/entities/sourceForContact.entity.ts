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
export class SourceForContact {
  @PrimaryGeneratedColumn()
  sourceForContactId: number;

  @Column()
  contactId: number;

  @Column()
  contactSourceId: number;

  @Column({ type: 'boolean' })
  isActive: boolean;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  endDate?: Date;
}
