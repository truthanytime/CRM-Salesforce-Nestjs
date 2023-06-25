import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Contact } from './contact.entity';

@Entity()
export class ContactStage {
  @PrimaryGeneratedColumn()
  contactStageId: number;

  @Column()
  contactStageName: string;

  @Column({ type: 'text' })
  description: string;

  @OneToMany(() => Contact, (contact) => contact.contactStage)
  contact?: Contact[];
}
