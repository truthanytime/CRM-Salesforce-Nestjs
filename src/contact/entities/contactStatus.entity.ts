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
import { Contact } from './contact.entity';

@Entity()
export class ContactStatus {
  @PrimaryGeneratedColumn()
  contactStatusId: number;

  @Column()
  contactStatusName: string;

  @Column({ type: 'text' })
  description: string;

  @OneToMany(() => Contact, (contact) => contact.contactStatus)
  contact?: Contact[];
}
