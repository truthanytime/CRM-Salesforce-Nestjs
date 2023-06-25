import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountTypeRequestDto } from '../dto/accountType/create-accountType.request.dto';
import { AccountTypeResponseDto } from '../dto/accountType/accountType.response.dto';
import { UpdateAccountTypeRequestDto } from '../dto/accountType/update-accountType.request.dto';
import { AccountTypeRepository } from '../repositories/accountType.repository';

@Injectable()
export class AccountTypeService {
  constructor(private readonly accountTypeRepository: AccountTypeRepository) {}

  async create(
    data: CreateAccountTypeRequestDto,
    ownerId: number,
  ): Promise<AccountTypeResponseDto> {
    const accountType = this.accountTypeRepository.create(data);

    const savedAccountType = await this.accountTypeRepository.save(accountType);

    return savedAccountType;
  }

  async findOne(id: number): Promise<AccountTypeResponseDto> {
    const accountType = await this.accountTypeRepository.findOne(id);
    if (!accountType) {
      throw new NotFoundException('AccountType not found!');
    }
    return accountType;
  }

  async update(
    id: number,
    data: UpdateAccountTypeRequestDto,
    ownerId: number,
  ): Promise<AccountTypeResponseDto> {
    const accountType = await this.findOne(id);

    if (!accountType) {
      throw new NotFoundException('AccountType not found!');
    }

    const savedAccountType = await this.accountTypeRepository.save({
      ...accountType,
      ...data,
    });

    return savedAccountType;
  }

  async findAll(): Promise<AccountTypeResponseDto[]> {
    const accountTypeResponse: AccountTypeResponseDto[] =
      await this.accountTypeRepository.find();
    return accountTypeResponse;
  }

  async delete(id: number, ownerId: number): Promise<void> {
    const accountType = await this.accountTypeRepository.findOne(id);

    if (!accountType) {
      throw new NotFoundException('AccountType not found!');
    }

    await this.accountTypeRepository.remove([accountType]);
  }
}
