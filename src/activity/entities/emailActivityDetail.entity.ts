import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  Index,
} from 'typeorm';
import { Activity } from './activity.entity';
import { EmailType } from './emailType.entity';

@Entity()
export class EmailActivityDetail {
  @PrimaryGeneratedColumn()
  emailActivityDetailId: number;

  @Column()
  activityId: number;

  @Index()
  @Column({
    nullable: true,
    unique: true,
  })
  emailMessageId: string;

  @Column()
  emailFrom: string;

  @Column()
  emailTo: string;

  @Column()
  emailSubject: string;

  @Column({ type: 'text' })
  emailBody: string;

  @Column({ type: 'timestamptz', default: () => 'now()' })
  emailDate: Date;

  @Column({ type: 'boolean', default: false })
  hasAttachment: boolean;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  replyToEmailId: number;

  @Column()
  emailTypeId: number;

  @ManyToOne(() => Activity, (activity) => activity.emailActivityDetails, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'activity_id',
    referencedColumnName: 'activityId',
  })
  activity?: Activity;

  @ManyToOne(() => EmailType, (emailType) => emailType.emailActivityDetails, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'email_type_id',
    referencedColumnName: 'emailTypeId',
  })
  emailType?: EmailType;
}
