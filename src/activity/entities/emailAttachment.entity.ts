import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class EmailAttachment {
  @PrimaryGeneratedColumn()
  emailAttachmentId: number;

  @Column()
  emailActivityDetailId: number;

  @Column()
  attachmentTitle: string;

  @Column({ type: 'text', nullable: true })
  attachmentDescription: string;

  @Column({ nullable: true })
  attachmentType: string;

  @Column({ type: 'decimal', nullable: true })
  attachmentSizeInMB: number;

  @Column({ nullable: true })
  attachment: string;
}
