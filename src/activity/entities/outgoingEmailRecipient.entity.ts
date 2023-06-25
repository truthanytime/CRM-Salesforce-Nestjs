import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class OutgoingEmailRecipient {
  @PrimaryGeneratedColumn()
  outgoingEmailRecipientId: number;

  @Column()
  emailActivityDetailId: number;

  @Column()
  recipientContactId: number;

  @Column({ type: 'boolean' })
  isReceived: boolean;

  @Column({ type: 'timestamp' })
  receivedDate: Date;

  @Column({ type: 'timestamp' })
  receivedTime: Date;
}
