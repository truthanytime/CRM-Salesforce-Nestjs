import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactStatusRequestDto } from '../dto/contactStatus/create-contactStatus.request.dto';
import { ContactStatusResponseDto } from '../dto/contactStatus/contactStatus.response.dto';
import { UpdateContactStatusRequestDto } from '../dto/contactStatus/update-contactStatus.request.dto';
import { ContactStatusRepository } from '../repositories/contactStatus.repository';

@Injectable()
export class ContactStatusService {
  constructor(
    private readonly contactStatusRepository: ContactStatusRepository,
  ) {}

  async create(
    data: CreateContactStatusRequestDto,
    ownerId: number,
  ): Promise<ContactStatusResponseDto> {
    const contactStatus = this.contactStatusRepository.create(data);

    const savedContactStatus = await this.contactStatusRepository.save(
      contactStatus,
    );

    return savedContactStatus;
  }

  async findOne(id: number): Promise<ContactStatusResponseDto> {
    const contactStatus = await this.contactStatusRepository.findOne(id);
    if (!contactStatus) {
      throw new NotFoundException('ContactStatus not found!');
    }
    return contactStatus;
  }

  async update(
    id: number,
    data: UpdateContactStatusRequestDto,
    ownerId: number,
  ): Promise<ContactStatusResponseDto> {
    const contactStatus = await this.findOne(id);

    if (!contactStatus) {
      throw new NotFoundException('ContactStatus not found!');
    }

    const savedContactStatus = await this.contactStatusRepository.save({
      ...contactStatus,
      ...data,
    });

    return savedContactStatus;
  }

  async findAll(): Promise<ContactStatusResponseDto[]> {
    const contactStatusResponse: ContactStatusResponseDto[] =
      await this.contactStatusRepository.find();
    return contactStatusResponse;
  }

  async delete(id: number, ownerId: number): Promise<void> {
    const contactStatus = await this.contactStatusRepository.findOne(id);

    if (!contactStatus) {
      throw new NotFoundException('ContactStatus not found!');
    }

    await this.contactStatusRepository.remove([contactStatus]);
  }
}
