import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AccountTypeService } from '../services/accountType.service';
import { CreateAccountTypeRequestDto } from '../dto/accountType/create-accountType.request.dto';
import { UpdateAccountTypeRequestDto } from '../dto/accountType/update-accountType.request.dto';
import { SuccessResponseObject } from '@/common/http';
import { PayloadExistsValidationPipe } from '@/common/pipes/payload-exists.pipe';
import { AccountTypeResponseDto } from '../dto/accountType/accountType.response.dto';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthedUser } from '@/auth/decorators/authed-user.decorator';
import { IAuthedUser } from '@/auth/types';

@ApiTags('AccountType')
@UseGuards(AuthGuard('jwt'))
@Controller('accountType')
export class AccountTypeController {
  constructor(private readonly accountTypeService: AccountTypeService) {}

  @ApiOperation({ summary: 'Create accountType' })
  @ApiCreatedResponse({
    description: 'AccountType created successfully!',
    type: AccountTypeResponseDto,
  })
  @Post()
  async createAccountType(
    @AuthedUser() authedUser: IAuthedUser,
    @Body() body: CreateAccountTypeRequestDto,
  ) {
    try {
      const accountType = await this.accountTypeService.create(
        body,
        authedUser.userId,
      );

      return new SuccessResponseObject(
        'AccountType created successfully!',
        accountType,
      );
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Update accountType by id' })
  @ApiOkResponse({ description: 'AccountType updated successfully!' })
  @Put(':id')
  async updateAccountType(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
    @Body(PayloadExistsValidationPipe) body: UpdateAccountTypeRequestDto,
  ) {
    try {
      const accountType = await this.accountTypeService.update(
        id,
        body,
        authedUser.userId,
      );

      return new SuccessResponseObject(
        'AccountType updated successfully!',
        accountType,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Get all accountTypes' })
  @ApiOkResponse({
    description: 'AccountTypes fetched successfully!',
    type: [AccountTypeResponseDto],
  })
  @Get()
  async getAccountTypes(@AuthedUser() authedUser: IAuthedUser) {
    try {
      const accountTypes = await this.accountTypeService.findAll();

      return new SuccessResponseObject(
        'AccountTypes fetched successfully!',
        accountTypes,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Get accountType by id' })
  @ApiOkResponse({
    description: 'AccountType fetched successfully!',
    type: AccountTypeResponseDto,
  })
  @Get(':id')
  async getAccountType(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
  ) {
    try {
      const accountType = await this.accountTypeService.findOne(id);

      return new SuccessResponseObject(
        'AccountType fetched successfully!',
        accountType,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Delete accountType by id' })
  @ApiNoContentResponse({ description: 'AccountType successfully deleted!' })
  @Delete(':id')
  async deleteAccountType(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
  ) {
    try {
      await this.accountTypeService.delete(id, authedUser.userId);

      return new SuccessResponseObject('AccountType successfully deleted!');
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      throw new InternalServerErrorException();
    }
  }
}
