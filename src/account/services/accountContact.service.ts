import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountContactRequestDto } from '../dto/accountContact/create-accountContact.request.dto';
import { AccountContactResponseDto } from '../dto/accountContact/accountContact.response.dto';
import { UpdateAccountContactRequestDto } from '../dto/accountContact/update-accountContact.request.dto';
import { AccountContactRepository } from '../repositories/accountContact.repository';

@Injectable()
export class AccountContactService {
  constructor(
    private readonly accountContactRepository: AccountContactRepository,
  ) {}

  async create(
    data: CreateAccountContactRequestDto,
    ownerId: number,
  ): Promise<AccountContactResponseDto> {
    const oldAccConts = await this.accountContactRepository.find({
      where: { accountId: data.accountId, contactId: data.contactId },
    });

    if (oldAccConts.length > 0) {
      throw new NotFoundException(
        'Account and Contact relation is alreay existed!',
      );
    }
    const accountContact = this.accountContactRepository.create(data);

    const savedAccountContact = await this.accountContactRepository.save(
      accountContact,
    );

    return savedAccountContact;
  }

  async findOne(id: number): Promise<AccountContactResponseDto> {
    const accountContact = await this.accountContactRepository.findOne(id);
    if (!accountContact) {
      throw new NotFoundException('AccountContact not found!');
    }
    return accountContact;
  }

  async getContactsByAccountId(
    id: number,
  ): Promise<AccountContactResponseDto[]> {
    const accountContact = await this.accountContactRepository.find({
      where: { accountId: id },
      relations: ['contact', 'contact.contactInfo'],
    });
    if (!accountContact) {
      throw new NotFoundException('AccountContact not found!');
    }
    return accountContact;
  }

  async getAccountsByContactId(
    id: number,
  ): Promise<AccountContactResponseDto[]> {
    const accountContact = await this.accountContactRepository.find({
      where: { contactId: id },
      relations: ['account', 'account.contactInfo'],
    });
    if (!accountContact) {
      throw new NotFoundException('AccountContact not found!');
    }
    return accountContact;
  }

  async update(
    id: number,
    data: UpdateAccountContactRequestDto,
    ownerId: number,
  ): Promise<AccountContactResponseDto> {
    const accountContact = await this.findOne(id);

    if (!accountContact) {
      throw new NotFoundException('AccountContact not found!');
    }

    const savedAccountContact = await this.accountContactRepository.save({
      ...accountContact,
      ...data,
    });

    return savedAccountContact;
  }

  async findAll(): Promise<AccountContactResponseDto[]> {
    const accountContactResponse: AccountContactResponseDto[] =
      await this.accountContactRepository.find();
    return accountContactResponse;
  }

  async delete(id: number, ownerId: number): Promise<void> {
    const accountContact = await this.accountContactRepository.findOne(id);

    if (!accountContact) {
      throw new NotFoundException('AccountContact not found!');
    }

    await this.accountContactRepository.remove([accountContact]);
  }
}
