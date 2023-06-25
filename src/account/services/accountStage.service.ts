import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountStageRequestDto } from '../dto/accountStage/create-accountStage.request.dto';
import { AccountStageResponseDto } from '../dto/accountStage/accountStage.response.dto';
import { UpdateAccountStageRequestDto } from '../dto/accountStage/update-accountStage.request.dto';
import { AccountStageRepository } from '../repositories/accountStage.repository';

@Injectable()
export class AccountStageService {
  constructor(
    private readonly accountStageRepository: AccountStageRepository,
  ) {}

  async create(
    data: CreateAccountStageRequestDto,
    ownerId: number,
  ): Promise<AccountStageResponseDto> {
    const accountStage = this.accountStageRepository.create(data);

    const savedAccountStage = await this.accountStageRepository.save(
      accountStage,
    );

    return savedAccountStage;
  }

  async findOne(id: number): Promise<AccountStageResponseDto> {
    const accountStage = await this.accountStageRepository.findOne(id);
    if (!accountStage) {
      throw new NotFoundException('AccountStage not found!');
    }
    return accountStage;
  }

  async update(
    id: number,
    data: UpdateAccountStageRequestDto,
    ownerId: number,
  ): Promise<AccountStageResponseDto> {
    const accountStage = await this.findOne(id);

    if (!accountStage) {
      throw new NotFoundException('AccountStage not found!');
    }

    const savedAccountStage = await this.accountStageRepository.save({
      ...accountStage,
      ...data,
    });

    return savedAccountStage;
  }

  async findAll(): Promise<AccountStageResponseDto[]> {
    const accountStageResponse: AccountStageResponseDto[] =
      await this.accountStageRepository.find();
    return accountStageResponse;
  }

  async delete(id: number, ownerId: number): Promise<void> {
    const accountStage = await this.accountStageRepository.findOne(id);

    if (!accountStage) {
      throw new NotFoundException('AccountStage not found!');
    }

    await this.accountStageRepository.remove([accountStage]);
  }
}
