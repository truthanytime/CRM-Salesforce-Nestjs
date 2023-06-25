import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { CreateTenantRequestDto } from '../dto/create-tenant.request.dto';
import { UpdateTenantRequestDto } from '../dto/update-tenant.request.dto';
import { TenantResponseDto } from '../dto/tenant.response.dto';
import { AddressType, UserType } from '@/user/types';
import { UserService } from '@/user/services/user.service';
import isEmpty from 'lodash.isempty';
import { cleanObject } from '@/common/utils';
import { TenantRepository } from '../repositories/tenant.repository';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { tenantNormalizer } from '../normalizers/tenant.normalizer';
import { AuthService } from '@/auth/auth.service';
import { TenantContactInformationService } from './tenantContactInformation.service';

@Injectable()
export class TenantService {
  constructor(
    private readonly tenantRepository: TenantRepository,
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly tenantContactInfoService: TenantContactInformationService,
  ) {}

  @Transactional()
  async create(data: CreateTenantRequestDto): Promise<TenantResponseDto> {
    const { ownerName, ownerEmail, ...tenantData } = data;

    const user = await this.userService.create({
      userName: ownerName,
      userEmail: ownerEmail,
      userType: UserType.TENANT_USER,
      phoneNumber: '',
    });

    const tenant = this.tenantRepository.create({
      ...tenantData,
      ownerId: user.userId,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const savedCo = await this.tenantRepository.save(tenant);

    await this.userService.update(user.userId, {
      tenantId: savedCo.tenantId,
    });

    const contactInfo = await this.tenantContactInfoService.create({
      tenantId: savedCo.tenantId,
      addressType: AddressType.MAILING,
      ...data.contactInfo,
    });
    const billingContactInfo = await this.tenantContactInfoService.create({
      tenantId: savedCo.tenantId,
      addressType: AddressType.BUSINESS,
      ...data.billingContactInfo,
    });

    return tenantNormalizer.getTenantResponseDto({
      ...savedCo,
      contactInfos: [contactInfo, billingContactInfo],
      owner: { ...user, userCognitoId: '' },
    });
  }

  async findOne(id: number): Promise<TenantResponseDto> {
    const tenant = await this.tenantRepository.findOne(id, {
      relations: ['owner', 'contactInfos'],
    });
    return tenantNormalizer.getTenantResponseDto(tenant);
  }

  async findAll(): Promise<TenantResponseDto[]> {
    const companies = await this.tenantRepository.find({
      relations: ['owner', 'contactInfos'],
    });

    return companies.map(tenantNormalizer.getTenantResponseDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.tenantRepository.delete(id);
  }

  @Transactional()
  async update(id: number, data: UpdateTenantRequestDto): Promise<void> {
    const { userName, userEmail, ...tenantData } = data;

    const tenant = await this.findOne(id);

    if (!tenant) {
      throw new NotFoundException('Tenant not found!');
    }

    if (!isEmpty(tenantData)) {
      await this.tenantRepository.save({
        ...tenant,
        ...cleanObject(tenantData),
      });
    }

    if (data.contactInfo) {
      await this.tenantContactInfoService.update(
        tenant.contactInfo.tenantContInfoId,
        data.contactInfo,
      );
    }
    if (data.billingContactInfo) {
      await this.tenantContactInfoService.update(
        tenant.billingContactInfo.tenantContInfoId,
        data.billingContactInfo,
      );
    }
  }

  async delete(id: number): Promise<void> {
    const tenant = await this.tenantRepository.findOne(id, {
      relations: ['users', 'contactInfos'],
    });

    if (!tenant) {
      throw new NotFoundException('Tenant not found!');
    }

    await this.tenantRepository.remove([tenant]);

    await Promise.all(
      tenant.users.map((user) =>
        this.authService.deleteUser(user.userCognitoId),
      ),
    );
  }
}
