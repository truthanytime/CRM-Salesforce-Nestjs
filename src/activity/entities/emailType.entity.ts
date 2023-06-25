import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { EmailActivityDetail } from './emailActivityDetail.entity';

@Entity()
export class EmailType {
  @PrimaryGeneratedColumn()
  emailTypeId: number;

  @Column()
  emailType: string;

  @Column({ type: 'text' })
  description: number;

  @OneToMany(
    () => EmailActivityDetail,
    (emailActivityDetail) => emailActivityDetail.emailType,
  )
  emailActivityDetails: EmailActivityDetail[];
}
