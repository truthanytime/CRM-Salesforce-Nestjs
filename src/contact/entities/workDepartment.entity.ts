import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class WorkDepartment {
  @PrimaryGeneratedColumn()
  workDepartmentId: number;

  @Column()
  workDepartmentName: string;

  @Column({ type: 'text' })
  description: string;
}
