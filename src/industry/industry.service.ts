import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateIndustryRequestDto } from './dto/create-industry.request.dto';
import { IndustryResponseDto } from './dto/industry.response.dto';
import { UpdateIndustryRequestDto } from './dto/update-industry.request.dto';
import { IndustryRepository } from './industry.repository';
import { FindOneOptions } from 'typeorm';
import { Industry } from './industry.entity';

@Injectable()
export class IndustryService {
  constructor(private readonly industryRepository: IndustryRepository) {}

  async create(
    data: CreateIndustryRequestDto,
    ownerId: number,
  ): Promise<IndustryResponseDto> {
    const industry = this.industryRepository.create(data);

    const savedIndustry = await this.industryRepository.save(industry);

    return savedIndustry;
  }

  async findOne(id: number): Promise<IndustryResponseDto> {
    const findOptions: FindOneOptions<Industry> = {
      where: { industryId: id },
      relations: ['industryModifier', 'industryOwner', 'industryAccount'],
    };
    const industry = await this.industryRepository.findOne(
      undefined,
      findOptions,
    );
    if (!industry) {
      throw new NotFoundException('Industry not found!');
    }
    return industry;
  }

  async update(
    id: number,
    data: UpdateIndustryRequestDto,
    ownerId: number,
  ): Promise<IndustryResponseDto> {
    const industry = await this.findOne(id);

    if (!industry) {
      throw new NotFoundException('Industry not found!');
    }

    await this.industryRepository.update(id, data);

    return await this.findOne(id);
  }

  async findAll(): Promise<IndustryResponseDto[]> {
    const industryResponse: IndustryResponseDto[] =
      await this.industryRepository.find();
    return industryResponse;
  }

  async delete(id: number, ownerId: number): Promise<void> {
    const industry = await this.industryRepository.findOne(id);

    if (!industry) {
      throw new NotFoundException('Industry not found!');
    }

    await this.industryRepository.remove([industry]);
  }
}
