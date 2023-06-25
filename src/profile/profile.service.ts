import { cleanObject } from '@/common/utils';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ProfileRepository } from './profile.repository';
import { ProfileCreationAttributes, ProfileUpdateAttributes } from './types';

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async create(data: ProfileCreationAttributes) {
    const profile = this.profileRepository.create(data);

    const savedProfile = await this.profileRepository.save(profile);

    return savedProfile;
  }

  async update(id: number, data: ProfileUpdateAttributes) {
    const profile = await this.profileRepository.findOne(id);

    if (!profile) {
      throw new NotFoundException('PRofile not found!');
    }

    await this.profileRepository.save({ ...profile, ...cleanObject(data) });
  }
}
