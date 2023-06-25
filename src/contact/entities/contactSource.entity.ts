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
export class ContactSource {
  @PrimaryGeneratedColumn()
  contactSourceId: number;

  @Column()
  contactSourceName: string;

  @Column({ type: 'text' })
  description: string;

  @OneToMany(() => Contact, (contact) => contact.contactSource)
  contact?: Contact[];
}
