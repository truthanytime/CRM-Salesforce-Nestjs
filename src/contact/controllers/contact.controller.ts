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
import { ContactService } from '../services/contact.service';
import { CreateContactRequestDto } from '../dto/contact/create-contact.request.dto';
import { UpdateContactRequestDto } from '../dto/contact/update-contact.request.dto';
import { SuccessResponseObject } from '../../common/http';
import { PayloadExistsValidationPipe } from '@/common/pipes/payload-exists.pipe';
import { ContactResponseDto } from '../dto/contact/contact.response.dto';
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

@ApiTags('Contact')
@UseGuards(AuthGuard('jwt'))
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @ApiOperation({ summary: 'Create contact' })
  @ApiCreatedResponse({
    description: 'Contact created successfully!',
    type: ContactResponseDto,
  })
  @Post()
  async createContact(
    @AuthedUser() authedUser: IAuthedUser,
    @Body() body: CreateContactRequestDto,
  ) {
    try {
      const contact = await this.contactService.create(body, authedUser.userId);

      return new SuccessResponseObject(
        'Contact created successfully!',
        contact,
      );
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Update contact by id' })
  @ApiOkResponse({ description: 'Contact updated successfully!' })
  @Put(':id')
  async updateContact(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
    @Body(PayloadExistsValidationPipe) body: UpdateContactRequestDto,
  ) {
    try {
      const contact = await this.contactService.update(
        id,
        body,
        authedUser.userId,
      );

      return new SuccessResponseObject(
        'Contact updated successfully!',
        contact,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Get all contacts' })
  @ApiOkResponse({
    description: 'Contacts fetched successfully!',
    type: [ContactResponseDto],
  })
  @Get()
  async getContacts(@AuthedUser() authedUser: IAuthedUser) {
    try {
      const contacts = await this.contactService.findAll(authedUser.userId);

      return new SuccessResponseObject(
        'Contacts fetched successfully!',
        contacts,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Get contact by id' })
  @ApiOkResponse({
    description: 'Contact fetched successfully!',
    type: ContactResponseDto,
  })
  @Get(':id')
  async getContact(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
  ) {
    try {
      const contact = await this.contactService.findOne(id, authedUser.userId);

      return new SuccessResponseObject(
        'Contact fetched successfully!',
        contact,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Delete contact by id' })
  @ApiNoContentResponse({ description: 'Contact successfully deleted!' })
  @Delete(':id')
  async deleteContact(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
  ) {
    try {
      await this.contactService.delete(id, authedUser.userId);

      return new SuccessResponseObject('Contact successfully deleted!');
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      throw new InternalServerErrorException();
    }
  }
}
