import { Account } from '@/account/entities/account.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Industry {
  @PrimaryGeneratedColumn()
  industryId: number;

  @Column({ unique: true })
  title: string;

  @Column({ unique: true })
  code: string;

  @Column({ type: 'text' })
  description: string;

  @OneToMany(() => Account, (account) => account.industry)
  accounts?: Account[];
}
