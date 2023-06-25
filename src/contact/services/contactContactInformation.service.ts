import { cleanObject } from '@/common/utils';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ContactContactInformationRepository } from '../repositories/contactContactInformation.repository';
import {
  ContactContactInfoCreationAttributes,
  ContactContactInfoUpdateAttributes,
} from '../types';

@Injectable()
export class ContactContactInformationService {
  constructor(
    private readonly userContactInformationRepository: ContactContactInformationRepository,
  ) {}

  async create(data: ContactContactInfoCreationAttributes) {
    const userContactInformation =
      this.userContactInformationRepository.create(data);

    const savedUserContactInformation =
      await this.userContactInformationRepository.save(userContactInformation);

    return savedUserContactInformation;
  }

  async update(id: number, data: ContactContactInfoUpdateAttributes) {
    const userContactInformation =
      await this.userContactInformationRepository.findOne(id);

    if (!userContactInformation) {
      throw new NotFoundException('ContactContactInformation not found!');
    }

    await this.userContactInformationRepository.save({
      ...userContactInformation,
      ...cleanObject(data),
    });
  }
}
