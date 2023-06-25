import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactStageRequestDto } from '../dto/contactStage/create-contactStage.request.dto';
import { ContactStageResponseDto } from '../dto/contactStage/contactStage.response.dto';
import { UpdateContactStageRequestDto } from '../dto/contactStage/update-contactStage.request.dto';
import { ContactStageRepository } from '../repositories/contactStage.repository';

@Injectable()
export class ContactStageService {
  constructor(
    private readonly contactStageRepository: ContactStageRepository,
  ) {}

  async create(
    data: CreateContactStageRequestDto,
    ownerId: number,
  ): Promise<ContactStageResponseDto> {
    const contactStage = this.contactStageRepository.create(data);

    const savedContactStage = await this.contactStageRepository.save(
      contactStage,
    );

    return savedContactStage;
  }

  async findOne(id: number): Promise<ContactStageResponseDto> {
    const contactStage = await this.contactStageRepository.findOne(id);
    if (!contactStage) {
      throw new NotFoundException('ContactStage not found!');
    }
    return contactStage;
  }

  async update(
    id: number,
    data: UpdateContactStageRequestDto,
    ownerId: number,
  ): Promise<ContactStageResponseDto> {
    const contactStage = await this.findOne(id);

    if (!contactStage) {
      throw new NotFoundException('ContactStage not found!');
    }

    const savedContactStage = await this.contactStageRepository.save({
      ...contactStage,
      ...data,
    });

    return savedContactStage;
  }

  async findAll(): Promise<ContactStageResponseDto[]> {
    const contactStageResponse: ContactStageResponseDto[] =
      await this.contactStageRepository.find();
    return contactStageResponse;
  }

  async delete(id: number, ownerId: number): Promise<void> {
    const contactStage = await this.contactStageRepository.findOne(id);

    if (!contactStage) {
      throw new NotFoundException('ContactStage not found!');
    }

    await this.contactStageRepository.remove([contactStage]);
  }
}
