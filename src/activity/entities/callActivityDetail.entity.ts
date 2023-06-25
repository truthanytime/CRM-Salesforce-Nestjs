import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class CallActivityDetail {
  @PrimaryGeneratedColumn()
  callActivityDetailId: number;

  @Column()
  activityId: number;

  @Column({ type: 'date' })
  callDate: Date;

  @Column({ type: 'time' })
  callTime: Date;

  @Column({ nullable: true })
  callTopic: string;

  @Column({ nullable: true })
  callSummary: string;
}
