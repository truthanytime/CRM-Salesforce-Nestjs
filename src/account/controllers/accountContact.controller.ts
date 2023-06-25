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
import { AccountContactService } from '../services/accountContact.service';
import { CreateAccountContactRequestDto } from '../dto/accountContact/create-accountContact.request.dto';
import { UpdateAccountContactRequestDto } from '../dto/accountContact/update-accountContact.request.dto';
import { SuccessResponseObject } from '@/common/http';
import { PayloadExistsValidationPipe } from '@/common/pipes/payload-exists.pipe';
import { AccountContactResponseDto } from '../dto/accountContact/accountContact.response.dto';
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

@ApiTags('AccountContact')
@UseGuards(AuthGuard('jwt'))
@Controller('accountContact')
export class AccountContactController {
  constructor(private readonly accountContactService: AccountContactService) {}

  @ApiOperation({ summary: 'Create accountContact' })
  @ApiCreatedResponse({
    description: 'AccountContact created successfully!',
    type: AccountContactResponseDto,
  })
  @Post()
  async createAccountContact(
    @AuthedUser() authedUser: IAuthedUser,
    @Body() body: CreateAccountContactRequestDto,
  ) {
    try {
      const accountContact = await this.accountContactService.create(
        body,
        authedUser.userId,
      );

      return new SuccessResponseObject(
        'AccountContact created successfully!',
        accountContact,
      );
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Update accountContact by id' })
  @ApiOkResponse({ description: 'AccountContact updated successfully!' })
  @Put(':id')
  async updateAccountContact(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
    @Body(PayloadExistsValidationPipe) body: UpdateAccountContactRequestDto,
  ) {
    try {
      const accountContact = await this.accountContactService.update(
        id,
        body,
        authedUser.userId,
      );

      return new SuccessResponseObject(
        'AccountContact updated successfully!',
        accountContact,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Get all accountContacts' })
  @ApiOkResponse({
    description: 'AccountContacts fetched successfully!',
    type: [AccountContactResponseDto],
  })
  @Get()
  async getAccountContacts(@AuthedUser() authedUser: IAuthedUser) {
    try {
      const accountContacts = await this.accountContactService.findAll();

      return new SuccessResponseObject(
        'AccountContacts fetched successfully!',
        accountContacts,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Get accountContact by id' })
  @ApiOkResponse({
    description: 'AccountContact fetched successfully!',
    type: AccountContactResponseDto,
  })
  @Get(':id')
  async getAccountContact(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
  ) {
    try {
      const accountContact = await this.accountContactService.findOne(id);

      return new SuccessResponseObject(
        'AccountContact fetched successfully!',
        accountContact,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Get All Contacts by account id' })
  @ApiOkResponse({
    description: 'Contacts fetched successfully!',
    type: AccountContactResponseDto,
  })
  @Get('contacts/:id')
  async getContactsByAccountId(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
  ) {
    try {
      const accountContact =
        await this.accountContactService.getContactsByAccountId(id);

      return new SuccessResponseObject(
        'AccountContact fetched successfully!',
        accountContact,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Get All Accounts by contact id' })
  @ApiOkResponse({
    description: 'Accounts fetched successfully!',
    type: AccountContactResponseDto,
  })
  @Get('accounts/:id')
  async getAccountsByContactId(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
  ) {
    try {
      const accountContact =
        await this.accountContactService.getAccountsByContactId(id);

      return new SuccessResponseObject(
        'AccountContact fetched successfully!',
        accountContact,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      throw new InternalServerErrorException();
    }
  }
  @ApiOperation({ summary: 'Delete accountContact by id' })
  @ApiNoContentResponse({ description: 'AccountContact successfully deleted!' })
  @Delete(':id')
  async deleteAccountContact(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
  ) {
    try {
      await this.accountContactService.delete(id, authedUser.userId);

      return new SuccessResponseObject('AccountContact successfully deleted!');
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      throw new InternalServerErrorException();
    }
  }
}
