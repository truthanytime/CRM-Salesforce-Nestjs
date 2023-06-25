import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class SalePhase {
  @PrimaryGeneratedColumn()
  salePhaseId: number;

  @Column()
  salePhaseName: string;

  @Column({ type: 'text' })
  description: string;
}
