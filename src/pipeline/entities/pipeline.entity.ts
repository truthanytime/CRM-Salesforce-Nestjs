import { Product } from '@/product/entities/product.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { PipelineDocument } from './pipelineDocument.entity';
import { PipelineStage } from './pipelineStage.entity';
import { User } from '@/user/entities/user.entity';

@Entity()
export class Pipeline {
  @PrimaryGeneratedColumn()
  pipelineId: number;

  @Column()
  pipelineName: string;

  @Column({ type: 'text', nullable: true })
  pipelineDescription: string;

  @Column()
  tenantId: number;

  @Column()
  creatorTenantUserId: number;

  @Column()
  isActive: boolean;

  @Column({ type: 'timestamp', default: () => 'now()' })
  createDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  startDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  endDate: Date;

  @OneToMany(() => PipelineStage, (pipelinestage) => pipelinestage.pipeline, {
    nullable: true,
    onDelete: 'CASCADE',
    cascade: ['remove'],
    orphanedRowAction: 'delete',
  })
  pipelineStages: PipelineStage[];

  @OneToMany(
    () => PipelineDocument,
    (pipelineDocument) => pipelineDocument.pipeline,
    {
      nullable: true,
      onDelete: 'CASCADE',
      cascade: ['remove'],
      orphanedRowAction: 'delete',
    },
  )
  pipelineDocuments: PipelineDocument[];

  @ManyToMany((type) => Product, (product) => product, {
    cascade: ['insert', 'remove'],
  })
  @JoinTable()
  pipelineProducts: Product[];

  @ManyToMany((type) => User, (user) => user, {
    cascade: ['insert', 'remove'],
  })
  @JoinTable()
  pipelineUsers: User[];
}
