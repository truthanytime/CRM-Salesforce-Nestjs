import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

export enum BaseStageType {
  'Pre-Sales',
  'Sales',
  'Post-Sales',
}

@Entity()
export class BaseStage {
  @PrimaryGeneratedColumn()
  baseStageId: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  type: string;
}
