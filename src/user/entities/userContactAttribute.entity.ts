import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Gender } from '@/user/types';
import { User } from './user.entity';

@Entity()
export class UserContactAttribute {
  @PrimaryGeneratedColumn()
  UserContactAttributeId: number;

  @Column()
  userId: number;

  @Column()
  contactId: number;

  @Column()
  attributeTitle: string;

  @Column({ type: 'text' })
  attributeText: string;

  @Column({ type: 'timestamp', default: () => 'now()' })
  createdDate: Date;

  @Column()
  tenantId: number;
}
