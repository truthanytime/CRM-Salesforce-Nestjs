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
import { ContactStatusService } from '../services/contactStatus.service';
import { CreateContactStatusRequestDto } from '../dto/contactStatus/create-contactStatus.request.dto';
import { UpdateContactStatusRequestDto } from '../dto/contactStatus/update-contactStatus.request.dto';
import { SuccessResponseObject } from '@/common/http';
import { PayloadExistsValidationPipe } from '@/common/pipes/payload-exists.pipe';
import { ContactStatusResponseDto } from '../dto/contactStatus/contactStatus.response.dto';
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

@ApiTags('ContactStatus')
@UseGuards(AuthGuard('jwt'))
@Controller('contactStatus')
export class ContactStatusController {
  constructor(private readonly contactStatusService: ContactStatusService) {}

  @ApiOperation({ summary: 'Create contactStatus' })
  @ApiCreatedResponse({
    description: 'ContactStatus created successfully!',
    type: ContactStatusResponseDto,
  })
  @Post()
  async createContactStatus(
    @AuthedUser() authedUser: IAuthedUser,
    @Body() body: CreateContactStatusRequestDto,
  ) {
    try {
      const contactStatus = await this.contactStatusService.create(
        body,
        authedUser.userId,
      );

      return new SuccessResponseObject(
        'ContactStatus created successfully!',
        contactStatus,
      );
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Update contactStatus by id' })
  @ApiOkResponse({ description: 'ContactStatus updated successfully!' })
  @Put(':id')
  async updateContactStatus(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
    @Body(PayloadExistsValidationPipe) body: UpdateContactStatusRequestDto,
  ) {
    try {
      const contactStatus = await this.contactStatusService.update(
        id,
        body,
        authedUser.userId,
      );

      return new SuccessResponseObject(
        'ContactStatus updated successfully!',
        contactStatus,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Get all contactStatuss' })
  @ApiOkResponse({
    description: 'ContactStatuss fetched successfully!',
    type: [ContactStatusResponseDto],
  })
  @Get()
  async getContactStatuss(@AuthedUser() authedUser: IAuthedUser) {
    try {
      const contactStatuss = await this.contactStatusService.findAll();

      return new SuccessResponseObject(
        'ContactStatuss fetched successfully!',
        contactStatuss,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Get contactStatus by id' })
  @ApiOkResponse({
    description: 'ContactStatus fetched successfully!',
    type: ContactStatusResponseDto,
  })
  @Get(':id')
  async getContactStatus(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
  ) {
    try {
      const contactStatus = await this.contactStatusService.findOne(id);

      return new SuccessResponseObject(
        'ContactStatus fetched successfully!',
        contactStatus,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Delete contactStatus by id' })
  @ApiNoContentResponse({ description: 'ContactStatus successfully deleted!' })
  @Delete(':id')
  async deleteContactStatus(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
  ) {
    try {
      await this.contactStatusService.delete(id, authedUser.userId);

      return new SuccessResponseObject('ContactStatus successfully deleted!');
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      throw new InternalServerErrorException();
    }
  }
}
