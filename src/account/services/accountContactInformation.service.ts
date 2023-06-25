import { cleanObject } from '@/common/utils';
import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountContactInformationRepository } from '../repositories/accountContactInformation.repository';
import {
  AccountContactInfoCreationAttributes,
  AccountContactInfoUpdateAttributes,
} from '../types';

@Injectable()
export class AccountContactInformationService {
  constructor(
    private readonly accountContactInformationRepository: AccountContactInformationRepository,
  ) {}

  async create(data: AccountContactInfoCreationAttributes) {
    const userContactInformation =
      this.accountContactInformationRepository.create(data);

    const savedUserContactInformation =
      await this.accountContactInformationRepository.save(
        userContactInformation,
      );

    return savedUserContactInformation;
  }

  async update(id: number, data: AccountContactInfoUpdateAttributes) {
    const userContactInformation =
      await this.accountContactInformationRepository.findOne(id);

    if (!userContactInformation) {
      throw new NotFoundException('ContactContactInformation not found!');
    }

    await this.accountContactInformationRepository.save({
      ...userContactInformation,
      ...cleanObject(data),
    });
  }
}
