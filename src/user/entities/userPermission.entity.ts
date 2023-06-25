import { Permission } from '@/permission/permission.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserPermission {
  @PrimaryGeneratedColumn()
  tenantUserPermissionId: number;

  @Column()
  userId: number;

  @Column()
  permissionId: number;

  @Column({ default: true })
  isCurrentPermssion: boolean;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  endDate?: Date;

  @ManyToOne(() => User, (user) => user.userPermissions)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'userId',
  })
  public user!: User;

  @ManyToOne(() => Permission, (permission) => permission.userPermissions)
  @JoinColumn({ name: 'permission_id', referencedColumnName: 'permissionId' })
  public permission!: Permission;
}
