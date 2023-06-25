import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactSourceRequestDto } from '../dto/contactSource/create-contactSource.request.dto';
import { ContactSourceResponseDto } from '../dto/contactSource/contactSource.response.dto';
import { UpdateContactSourceRequestDto } from '../dto/contactSource/update-contactSource.request.dto';
import { ContactSourceRepository } from '../repositories/contactSource.repository';

@Injectable()
export class ContactSourceService {
  constructor(
    private readonly contactSourceRepository: ContactSourceRepository,
  ) {}

  async create(
    data: CreateContactSourceRequestDto,
    ownerId: number,
  ): Promise<ContactSourceResponseDto> {
    const contactSource = this.contactSourceRepository.create(data);

    const savedContactSource = await this.contactSourceRepository.save(
      contactSource,
    );

    return savedContactSource;
  }

  async findOne(id: number): Promise<ContactSourceResponseDto> {
    const contactSource = await this.contactSourceRepository.findOne(id);
    if (!contactSource) {
      throw new NotFoundException('ContactSource not found!');
    }
    return contactSource;
  }

  async update(
    id: number,
    data: UpdateContactSourceRequestDto,
    ownerId: number,
  ): Promise<ContactSourceResponseDto> {
    const contactSource = await this.findOne(id);

    if (!contactSource) {
      throw new NotFoundException('ContactSource not found!');
    }

    const savedContactSource = await this.contactSourceRepository.save({
      ...contactSource,
      ...data,
    });

    return savedContactSource;
  }

  async findAll(): Promise<ContactSourceResponseDto[]> {
    const contactSourceResponse: ContactSourceResponseDto[] =
      await this.contactSourceRepository.find();
    return contactSourceResponse;
  }

  async delete(id: number, ownerId: number): Promise<void> {
    const contactSource = await this.contactSourceRepository.findOne(id);

    if (!contactSource) {
      throw new NotFoundException('ContactSource not found!');
    }

    await this.contactSourceRepository.remove([contactSource]);
  }
}
