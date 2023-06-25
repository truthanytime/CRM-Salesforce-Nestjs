import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactRequestDto } from '../dto/contact/create-contact.request.dto';
import { ContactResponseDto } from '../dto/contact/contact.response.dto';
import { UpdateContactRequestDto } from '../dto/contact/update-contact.request.dto';
import { ContactRepository } from '../repositories/contact.repository';
import { ContactContactInformationService } from './contactContactInformation.service';
import { contactNormalizer } from '../normalizers/contact.normalizer';

@Injectable()
export class ContactService {
  constructor(
    private readonly contactRepository: ContactRepository,
    private readonly contactContactInfoService: ContactContactInformationService,
  ) {}

  async create(
    data: CreateContactRequestDto,
    ownerId: number,
  ): Promise<ContactResponseDto> {
    const contact = this.contactRepository.create({
      ...data,
      createdBy: ownerId,
      tenantUserId: ownerId,
    });

    const savedContact = await this.contactRepository.save(contact);

    await this.contactContactInfoService.create({
      contactId: savedContact.contactId,
      ...data.contactInfo,
    });

    return contactNormalizer.getContactResponseDto(savedContact);
  }

  async findOne(id: number, ownerId: number): Promise<ContactResponseDto> {
    const contact = await this.contactRepository.findOne(id, {
      where: { tenantUserId: ownerId },
      relations: ['contactInfo', 'tenantUser', 'account'],
    });
    if (!contact) {
      throw new NotFoundException('Contact not found!');
    }
    return contactNormalizer.getContactResponseDto(contact);
  }

  async update(
    id: number,
    data: UpdateContactRequestDto,
    ownerId: number,
  ): Promise<ContactResponseDto> {
    const contact = await this.findOne(id, ownerId);

    if (!contact) {
      throw new NotFoundException('Contact not found!');
    }

    const savedContact = await this.contactRepository.save({
      ...contact,
      ...data,
      tenantUserId: ownerId,
      updateDate: new Date(),
    });

    return savedContact;
  }

  async findAll(userId: number): Promise<ContactResponseDto[]> {
    const contactResponse: ContactResponseDto[] =
      await this.contactRepository.find({
        where: { tenantUserId: userId },
        relations: ['contactInfo', 'tenantUser'],
      });
    console.log(...contactResponse);
    return contactResponse.map(contactNormalizer.getContactResponseDto);
  }

  async delete(id: number, ownerId: number): Promise<void> {
    const contact = await this.contactRepository.findOne(id, {
      where: { contactOwner: ownerId },
    });

    if (!contact) {
      throw new NotFoundException('Contact not found!');
    }

    await this.contactRepository.remove([contact]);
  }
}
