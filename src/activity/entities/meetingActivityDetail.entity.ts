import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class MeetingActivityDetail {
  @PrimaryGeneratedColumn()
  meetingActivityDetailId: number;

  @Column()
  activityId: number;

  @Column({ type: 'date' })
  meetingDate: Date;

  @Column({ type: 'time' })
  meetingTime: Date;

  @Column()
  subject: string;

  @Column()
  durationInMinutes: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  meetingRecord: string;

  @Column({ type: 'timestamp', nullable: true })
  dueDate: Date;

  @Column()
  status: string;
}
