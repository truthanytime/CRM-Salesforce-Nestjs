import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Pipeline } from './pipeline.entity';

@Entity()
export class PipelineDocument {
  @PrimaryGeneratedColumn()
  pipelineDocumentId: number;

  @ManyToOne(() => Pipeline, (pipeline) => pipeline.pipelineDocuments, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'pipeline_id',
    referencedColumnName: 'pipelineId',
  })
  pipeline: Pipeline;

  @Column({ nullable: true })
  name: string;

  @Column()
  location: string;

  @Column({ nullable: true })
  extention: string;

  @Column({ nullable: true })
  size: number;

  @Column()
  type: string;

  @Column({ nullable: true })
  fileKey: string;
}
