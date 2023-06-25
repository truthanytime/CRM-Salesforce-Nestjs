import { Injectable, NotFoundException } from '@nestjs/common';
import { baseStageResponseDto } from './dto/basestage.response.dto';
import { BaseStageRepository } from './repositories/baseStage.repository';

@Injectable()
export class baseStageService {
  constructor(private readonly baseStageRepository: BaseStageRepository) {}

  async findOne(id: number): Promise<baseStageResponseDto> {
    const baseStage = await this.baseStageRepository.findOne(id);
    if (!baseStage) {
      throw new NotFoundException('Pipeline not found!');
    }
    return baseStage;
  }

  async findAll(): Promise<baseStageResponseDto[]> {
    const baseStagesResponse: baseStageResponseDto[] =
      await this.baseStageRepository.find();
    return baseStagesResponse;
  }
}
