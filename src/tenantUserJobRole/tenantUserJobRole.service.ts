import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTenantUserJobRoleRequestDto } from './dto/create-tenantUserJobRole.request.dto';
import { TenantUserJobRoleResponseDto } from './dto/tenantUserJobRole.response.dto';
import { UpdateTenantUserJobRoleRequestDto } from './dto/update-tenantUserJobRole.request.dto';
import { TenantUserJobRoleRepository } from './repositories/tenantUserJobRole.repository';

@Injectable()
export class TenantUserJobRoleService {
  constructor(
    private readonly tenantUserJobRoleRepository: TenantUserJobRoleRepository,
  ) {}

  async create(
    data: CreateTenantUserJobRoleRequestDto,
    ownerId: number,
  ): Promise<TenantUserJobRoleResponseDto> {
    const tenantUserJobRole = this.tenantUserJobRoleRepository.create(data);

    const savedTenantUserJobRole = await this.tenantUserJobRoleRepository.save(
      tenantUserJobRole,
    );

    return savedTenantUserJobRole;
  }

  async findOne(
    id: number,
    ownerId: number,
  ): Promise<TenantUserJobRoleResponseDto> {
    const tenantUserJobRole = await this.tenantUserJobRoleRepository.findOne(
      id,
    );
    if (!tenantUserJobRole) {
      throw new NotFoundException('TenantUserJobRole not found!');
    }
    return tenantUserJobRole;
  }

  async update(
    id: number,
    data: UpdateTenantUserJobRoleRequestDto,
    ownerId: number,
  ): Promise<TenantUserJobRoleResponseDto> {
    const tenantUserJobRole = await this.findOne(id, ownerId);

    if (!tenantUserJobRole) {
      throw new NotFoundException('TenantUserJobRole not found!');
    }

    const savedTenantUserJobRole = await this.tenantUserJobRoleRepository.save({
      ...tenantUserJobRole,
      ...data,
    });

    return savedTenantUserJobRole;
  }

  async findAll(userId: number): Promise<TenantUserJobRoleResponseDto[]> {
    const tenantUserJobRoleResponse: TenantUserJobRoleResponseDto[] =
      await this.tenantUserJobRoleRepository.find({
        where: { tenantUserJobRoleOwner: userId },
      });
    return tenantUserJobRoleResponse;
  }

  async delete(id: number, ownerId: number): Promise<void> {
    const tenantUserJobRole = await this.tenantUserJobRoleRepository.findOne(
      id,
    );

    if (!tenantUserJobRole) {
      throw new NotFoundException('TenantUserJobRole not found!');
    }

    await this.tenantUserJobRoleRepository.remove([tenantUserJobRole]);
  }
}
