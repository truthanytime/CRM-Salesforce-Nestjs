import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { AddressType } from '@/user/types';
import { User } from './user.entity';

@Entity()
export class UserContactInformation {
  @PrimaryGeneratedColumn()
  userContInfoId: number;

  @Column()
  userId: number;

  @Column({ default: AddressType.MAILING })
  addressType: AddressType;

  @Column({ default: true })
  isCurrent: boolean;

  @Column({ type: 'timestamp', default: () => 'now()' })
  startValidDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  endValidDate?: Date;

  @Column({ nullable: true })
  phoneNumber?: string;

  @Column({ nullable: true })
  mobileNumber?: string;

  @Column({ nullable: true })
  country?: string;

  @Column({ nullable: true })
  zip?: string;

  @Column({ nullable: true })
  addressState?: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  street?: string;

  @Column({ nullable: true })
  email?: string;

  @OneToOne(() => User, (user) => user.contactInfo, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'userId' })
  user: User;
}
