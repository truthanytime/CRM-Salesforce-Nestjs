import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class MeetingAttendee {
  @PrimaryGeneratedColumn()
  meetingAttendeeId: number;

  @Column()
  neetingActivityDetailId: number;

  @Column()
  attendeeContactId: number;

  @Column({ type: 'boolean' })
  didAttend: boolean;
}
