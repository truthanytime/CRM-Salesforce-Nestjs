import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class SmsActivityDetail {
  @PrimaryGeneratedColumn()
  smsActivityDetailId: number;

  @Column()
  activityId: number;

  @Column({ type: 'date' })
  smsDate: Date;

  @Column({ type: 'time' })
  smsTime: Date;

  @Column({ nullable: true })
  smsTitle: string;

  @Column({ nullable: true })
  smsText: string;
}
