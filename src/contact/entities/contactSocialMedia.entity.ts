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
export class ContactSocialMedia {
  @PrimaryGeneratedColumn()
  contactSocialMediaId: number;

  @Column()
  contactId: number;

  @Column({ nullable: true })
  facebook: string;

  @Column({ nullable: true })
  linkedin: string;

  @Column({ nullable: true })
  twitter: string;
}
