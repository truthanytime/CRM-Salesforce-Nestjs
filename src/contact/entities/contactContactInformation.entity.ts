import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { AddressType, Gender } from '@/user/types';
import { Contact } from './contact.entity';

@Entity()
export class ContactContactInformation {
  @PrimaryGeneratedColumn()
  contactContInfoId: number;

  @Column()
  contactId?: number;

  @Column({ default: AddressType.MAILING })
  addressType?: AddressType;

  @Column({ default: true })
  isCurrent?: boolean;

  @Column({ type: 'timestamp', default: () => 'now()' })
  startValidDate?: Date;

  @Column({ type: 'timestamp', nullable: true })
  endValidDate?: Date;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  mobileNumber?: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  zip: string;

  @Column({ nullable: true })
  addressState: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  street: string;

  @Column({ nullable: true })
  email: string;

  //Relations

  @OneToOne(() => Contact, (contact) => contact.contactInfo, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'contact_id', referencedColumnName: 'contactId' })
  contact: Contact;
}
