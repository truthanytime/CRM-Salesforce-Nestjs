import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Pipeline } from './pipeline.entity';
import { BaseStage } from '@/basestage/entities/baseStage.entity';
import { User } from '@/user/entities/user.entity';
@Entity()
export class PipelineStage {
  @PrimaryGeneratedColumn()
  pipelineStageId: number;

  @Column()
  pipelineStageName: string;

  @Column({ type: 'text', nullable: true })
  pipelineStageDescription: string;

  @ManyToOne(() => Pipeline, (pipeline) => pipeline.pipelineStages, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'pipeline_id',
    referencedColumnName: 'pipelineId',
  })
  pipeline: Pipeline;

  @Column({ nullable: true })
  order: number;

  @Column({ type: 'text', nullable: true })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  type: string;

  @ManyToMany((type) => User, (user) => user, {
    cascade: ['insert', 'remove'],
  })
  @JoinTable()
  pipelineStageOwners: User[];
}
