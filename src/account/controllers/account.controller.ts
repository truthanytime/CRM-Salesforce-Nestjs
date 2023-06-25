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
import { AccountService } from '../services/account.service';
import { CreateAccountRequestDto } from '../dto/account/create-account.request.dto';
import { UpdateAccountRequestDto } from '../dto/account/update-account.request.dto';
import { SuccessResponseObject } from '@/common/http';
import { PayloadExistsValidationPipe } from '@/common/pipes/payload-exists.pipe';
import { AccountResponseDto } from '../dto/account/account.response.dto';
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

@ApiTags('Account')
@UseGuards(AuthGuard('jwt'))
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @ApiOperation({ summary: 'Create account' })
  @ApiCreatedResponse({
    description: 'Account created successfully!',
    type: AccountResponseDto,
  })
  @Post()
  async createAccount(
    @AuthedUser() authedUser: IAuthedUser,
    @Body() body: CreateAccountRequestDto,
  ) {
    try {
      const account = await this.accountService.create(body, authedUser.userId);

      return new SuccessResponseObject(
        'Account created successfully!',
        account,
      );
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Update account by id' })
  @ApiOkResponse({ description: 'Account updated successfully!' })
  @Put(':id')
  async updateAccount(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
    @Body(PayloadExistsValidationPipe) body: UpdateAccountRequestDto,
  ) {
    try {
      const account = await this.accountService.update(
        id,
        body,
        authedUser.userId,
      );

      return new SuccessResponseObject(
        'Account updated successfully!',
        account,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Get all accounts' })
  @ApiOkResponse({
    description: 'Accounts fetched successfully!',
    type: [AccountResponseDto],
  })
  @Get()
  async getAccounts(@AuthedUser() authedUser: IAuthedUser) {
    try {
      const accounts = await this.accountService.findAll(authedUser.userId);

      return new SuccessResponseObject(
        'Accounts fetched successfully!',
        accounts,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Get account by id' })
  @ApiOkResponse({
    description: 'Account fetched successfully!',
    type: AccountResponseDto,
  })
  @Get(':id')
  async getAccount(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
  ) {
    try {
      const account = await this.accountService.findOne(id, authedUser.userId);

      return new SuccessResponseObject(
        'Account fetched successfully!',
        account,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Delete account by id' })
  @ApiNoContentResponse({ description: 'Account successfully deleted!' })
  @Delete(':id')
  async deleteAccount(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
  ) {
    try {
      await this.accountService.delete(id, authedUser.userId);

      return new SuccessResponseObject('Account successfully deleted!');
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      throw new InternalServerErrorException();
    }
  }
}
