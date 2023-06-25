import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountRequestDto } from '../dto/account/create-account.request.dto';
import { AccountResponseDto } from '../dto/account/account.response.dto';
import { UpdateAccountRequestDto } from '../dto/account/update-account.request.dto';
import { AccountRepository } from '../repositories/account.repository';
import { AccountContactInformationService } from './accountContactInformation.service';
import { CreateAccountResponseDto } from '../dto/account/create-account.response.dto';
import { accountNormalizer } from '../normalizers/account.normalizer';

@Injectable()
export class AccountService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly accountContactInfoService: AccountContactInformationService,
  ) {}

  async create(
    data: CreateAccountRequestDto,
    ownerId: number,
  ): Promise<CreateAccountResponseDto> {
    const account = this.accountRepository.create({
      ...data,
      createdBy: ownerId,
      tenantUserId: ownerId,
    });

    const savedAccount = await this.accountRepository.save(account);

    await this.accountContactInfoService.create({
      accountId: savedAccount.accountId,
      ...data.contactInfo,
    });

    return savedAccount;
  }

  async findOne(id: number, ownerId: number): Promise<AccountResponseDto> {
    const account = await this.accountRepository.findOne(id, {
      where: { tenantUserId: ownerId },
      relations: [
        'contactInfo',
        'tenantUser',
        'contacts',
        'contacts.contactInfo',
      ],
    });
    if (!account) {
      throw new NotFoundException('Account not found!');
    }
    return accountNormalizer.getAccountResponseDto(account);
  }

  async update(
    id: number,
    data: UpdateAccountRequestDto,
    ownerId: number,
  ): Promise<AccountResponseDto> {
    const account = await this.findOne(id, ownerId);

    if (!account) {
      throw new NotFoundException('Account not found!');
    }

    const savedAccount = await this.accountRepository.save({
      ...account,
      ...data,
      tenantUserId: ownerId,
      updateDate: new Date(),
    });

    return savedAccount;
  }

  async findAll(ownerId: number): Promise<AccountResponseDto[]> {
    const accountResponse: AccountResponseDto[] =
      await this.accountRepository.find({
        where: { tenantUserId: ownerId },
        relations: ['contactInfo'],
      });
    return accountResponse.map(accountNormalizer.getAccountResponseDto);
  }

  async delete(id: number, ownerId: number): Promise<void> {
    const account = await this.accountRepository.findOne(id);

    if (!account) {
      throw new NotFoundException('Account not found!');
    }

    await this.accountRepository.remove([account]);
  }
}
