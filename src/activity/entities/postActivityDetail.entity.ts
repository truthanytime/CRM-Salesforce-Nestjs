import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class PostActivityDetail {
  @PrimaryGeneratedColumn()
  postActivityDetailId: number;

  @Column()
  activityId: number;

  @Column()
  postOwnerContactId: number;

  @Column()
  postTitle: string;

  @Column({ nullable: true })
  postText: string;

  @Column({ type: 'date' })
  postDate: Date;

  @Column({ type: 'time' })
  postTime: Date;
}
