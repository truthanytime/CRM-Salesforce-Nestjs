import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Resource {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pipelineId: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  dataType: string;

  @Column()
  createdBy: number;

  @Column()
  isActive: boolean;

  @Column({ type: 'timestamp', default: () => 'now()' })
  createDate: Date;
}
