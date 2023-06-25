import { UserPermission } from '@/user/entities/userPermission.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  permissionId: number;

  @Column()
  title: string;

  @Column()
  code: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(
    () => UserPermission,
    (userPermission) => userPermission.permission,
  )
  userPermissions!: UserPermission[];
}
