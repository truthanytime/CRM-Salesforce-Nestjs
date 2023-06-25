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
import { ContactSourceService } from '../services/contactSource.service';
import { CreateContactSourceRequestDto } from '../dto/contactSource/create-contactSource.request.dto';
import { UpdateContactSourceRequestDto } from '../dto/contactSource/update-contactSource.request.dto';
import { SuccessResponseObject } from '@/common/http';
import { PayloadExistsValidationPipe } from '@/common/pipes/payload-exists.pipe';
import { ContactSourceResponseDto } from '../dto/contactSource/contactSource.response.dto';
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

@ApiTags('ContactSource')
@UseGuards(AuthGuard('jwt'))
@Controller('contactSource')
export class ContactSourceController {
  constructor(private readonly contactSourceService: ContactSourceService) {}

  @ApiOperation({ summary: 'Create contactSource' })
  @ApiCreatedResponse({
    description: 'ContactSource created successfully!',
    type: ContactSourceResponseDto,
  })
  @Post()
  async createContactSource(
    @AuthedUser() authedUser: IAuthedUser,
    @Body() body: CreateContactSourceRequestDto,
  ) {
    try {
      const contactSource = await this.contactSourceService.create(
        body,
        authedUser.userId,
      );

      return new SuccessResponseObject(
        'ContactSource created successfully!',
        contactSource,
      );
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Update contactSource by id' })
  @ApiOkResponse({ description: 'ContactSource updated successfully!' })
  @Put(':id')
  async updateContactSource(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
    @Body(PayloadExistsValidationPipe) body: UpdateContactSourceRequestDto,
  ) {
    try {
      const contactSource = await this.contactSourceService.update(
        id,
        body,
        authedUser.userId,
      );

      return new SuccessResponseObject(
        'ContactSource updated successfully!',
        contactSource,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Get all contactSources' })
  @ApiOkResponse({
    description: 'ContactSources fetched successfully!',
    type: [ContactSourceResponseDto],
  })
  @Get()
  async getContactSources(@AuthedUser() authedUser: IAuthedUser) {
    try {
      const contactSources = await this.contactSourceService.findAll();

      return new SuccessResponseObject(
        'ContactSources fetched successfully!',
        contactSources,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Get contactSource by id' })
  @ApiOkResponse({
    description: 'ContactSource fetched successfully!',
    type: ContactSourceResponseDto,
  })
  @Get(':id')
  async getContactSource(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
  ) {
    try {
      const contactSource = await this.contactSourceService.findOne(id);

      return new SuccessResponseObject(
        'ContactSource fetched successfully!',
        contactSource,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Delete contactSource by id' })
  @ApiNoContentResponse({ description: 'ContactSource successfully deleted!' })
  @Delete(':id')
  async deleteContactSource(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
  ) {
    try {
      await this.contactSourceService.delete(id, authedUser.userId);

      return new SuccessResponseObject('ContactSource successfully deleted!');
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      throw new InternalServerErrorException();
    }
  }
}
