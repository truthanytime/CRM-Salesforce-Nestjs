import { cleanObject } from '@/common/utils';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TenantContactInformationRepository } from '../repositories/tenantContactInformation.repository';
import {
  TenantContactInfoCreationAttributes,
  TenantContactInfoUpdateAttributes,
} from '../types';

@Injectable()
export class TenantContactInformationService {
  constructor(
    private readonly accountContactInformationRepository: TenantContactInformationRepository,
  ) {}

  async create(data: TenantContactInfoCreationAttributes) {
    const tenantContactInformation =
      this.accountContactInformationRepository.create(data);

    const savedUserContactInformation =
      await this.accountContactInformationRepository.save(
        tenantContactInformation,
      );

    return savedUserContactInformation;
  }

  async update(id: number, data: TenantContactInfoUpdateAttributes) {
    const tenantContactInformation =
      await this.accountContactInformationRepository.findOne(id);

    if (!tenantContactInformation) {
      throw new NotFoundException('TenantContactInformation not found!');
    }

    await this.accountContactInformationRepository.save({
      ...tenantContactInformation,
      ...cleanObject(data),
    });
  }
}
