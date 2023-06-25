import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePermissionRequestDto } from './dto/create-permission.request.dto';
import { PermissionResponseDto } from './dto/permission.response.dto';
import { UpdatePermissionRequestDto } from './dto/update-permission.request.dto';
import { PermissionRepository } from './permission.repository';

@Injectable()
export class PermissionService {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async create(
    data: CreatePermissionRequestDto,
    ownerId: number,
  ): Promise<PermissionResponseDto> {
    const permission = this.permissionRepository.create(data);

    const savedPermission = await this.permissionRepository.save(permission);

    return savedPermission;
  }

  async findOne(id: number, ownerId: number): Promise<PermissionResponseDto> {
    const permission = await this.permissionRepository.findOne(id);
    if (!permission) {
      throw new NotFoundException('Permission not found!');
    }
    return permission;
  }

  async update(
    id: number,
    data: UpdatePermissionRequestDto,
    ownerId: number,
  ): Promise<PermissionResponseDto> {
    const permission = await this.findOne(id, ownerId);

    if (!permission) {
      throw new NotFoundException('Permission not found!');
    }

    const savedPermission = await this.permissionRepository.save({
      ...permission,
      ...data,
    });

    return savedPermission;
  }

  async findAll(userId: number): Promise<PermissionResponseDto[]> {
    const permissionResponse: PermissionResponseDto[] =
      await this.permissionRepository.find({
        where: { permissionOwner: userId },
      });
    return permissionResponse;
  }

  async delete(id: number, ownerId: number): Promise<void> {
    const permission = await this.permissionRepository.findOne(id);

    if (!permission) {
      throw new NotFoundException('Permission not found!');
    }

    await this.permissionRepository.remove([permission]);
  }
}
