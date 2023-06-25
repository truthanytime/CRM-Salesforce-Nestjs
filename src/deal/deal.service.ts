import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDealRequestDto } from './dto/create-deal.request.dto';
import { DealResponseDto } from './dto/deal.response.dto';
import { UpdateDealRequestDto } from './dto/update-deal.request.dto';
import { DealRepository } from './repositories/deal.repository';
import { FindOneOptions } from 'typeorm';
import { Deal } from './entities/deal.entity';

@Injectable()
export class DealService {
  constructor(private readonly dealRepository: DealRepository) {}

  async create(
    data: CreateDealRequestDto,
    userId: number,
  ): Promise<DealResponseDto> {
    const deal = this.dealRepository.create({
      ...data,
      createdBy: userId,
      tenantUserId: userId,
    });

    const savedDeal = await this.dealRepository.save(deal);

    return savedDeal;
  }

  async findOne(id: number, ownerId: number): Promise<DealResponseDto> {
    const deal = await this.dealRepository.findOne(id, {
      where: { tenantUserId: ownerId },
    });
    if (!deal) {
      throw new NotFoundException('Deal not found!');
    }
    return deal;
  }

  async update(
    id: number,
    data: UpdateDealRequestDto,
    ownerId: number,
  ): Promise<DealResponseDto> {
    const deal = await this.findOne(id, ownerId);

    if (!deal) {
      throw new NotFoundException('Deal not found!');
    }

    await this.dealRepository.update(id, {
      ...data,
      tenantUserId: ownerId,
      updateDate: new Date(),
    });

    return await this.findOne(id, ownerId);
  }

  async findAll(ownerId): Promise<DealResponseDto[]> {
    const dealResponse: DealResponseDto[] = await this.dealRepository.find({
      where: { tenantUserId: ownerId },
    });
    return dealResponse;
  }

  async delete(id: number, ownerId: number): Promise<void> {
    const deal = await this.dealRepository.findOne(id);

    if (!deal) {
      throw new NotFoundException('Deal not found!');
    }

    await this.dealRepository.remove([deal]);
  }
}
