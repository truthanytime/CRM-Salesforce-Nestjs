import { User } from '@/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  profileId: number;

  @Column()
  workPhoneNumber: string;

  @Column({ nullable: true })
  additionalPhoneNumber?: string;

  @Column({ nullable: true })
  profileJobRole?: string;

  @Column({ type: 'timestamp', default: () => 'now()' })
  profileCreatedAt: Date;

  @Column({ type: 'timestamp', default: () => 'now()' })
  profileUpdatedAt: Date;

  @Column()
  userId: number;

  // @OneToOne(() => User, (user) => user.profile, { onDelete: 'CASCADE' })
  // @JoinColumn({ name: 'user_id', referencedColumnName: 'userId' })
  // user: User;
}
