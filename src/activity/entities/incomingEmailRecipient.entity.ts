import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class IncomingEmailRecipient {
  @PrimaryGeneratedColumn()
  incomingEmailRecipientId: number;

  @Column()
  emailActivityDetailId: number;

  @Column()
  recipientTenantUserId: number;

  @Column({ type: 'boolean' })
  isReceived: boolean;

  @Column({ type: 'timestamp' })
  receivedDate: Date;

  @Column({ type: 'timestamp' })
  receivedTime: Date;
}
