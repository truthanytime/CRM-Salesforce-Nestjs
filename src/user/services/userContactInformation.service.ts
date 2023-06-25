import { cleanObject } from '@/common/utils';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserContactInformationRepository } from '../repositories/userContactInformation.repository';
import {
  UserContactInfoCreationAttributes,
  UserContactInfoUpdateAttributes,
} from '../types';

@Injectable()
export class UserContactInformationService {
  constructor(
    private readonly userContactInformationRepository: UserContactInformationRepository,
  ) {}

  async create(data: UserContactInfoCreationAttributes) {
    const userContactInformation =
      this.userContactInformationRepository.create(data);

    const savedUserContactInformation =
      await this.userContactInformationRepository.save(userContactInformation);

    return savedUserContactInformation;
  }

  async update(id: number, data: UserContactInfoUpdateAttributes) {
    const userContactInformation =
      await this.userContactInformationRepository.findOne(id);

    if (!userContactInformation) {
      throw new NotFoundException('PRofile not found!');
    }

    await this.userContactInformationRepository.save({
      ...userContactInformation,
      ...cleanObject(data),
    });
  }
}
