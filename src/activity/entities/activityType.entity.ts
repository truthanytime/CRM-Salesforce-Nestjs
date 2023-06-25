import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class ActivityType {
  @PrimaryGeneratedColumn()
  activityTypeId: number;

  @Column()
  activityName: string;

  @Column()
  creatorTenantUserId: number;

  @Column({ type: 'timestamp', default: () => 'now()' })
  createdDate: Date;
}
