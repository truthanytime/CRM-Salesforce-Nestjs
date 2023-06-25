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
import { ContactStageService } from '../services/contactStage.service';
import { CreateContactStageRequestDto } from '../dto/contactStage/create-contactStage.request.dto';
import { UpdateContactStageRequestDto } from '../dto/contactStage/update-contactStage.request.dto';
import { SuccessResponseObject } from '@/common/http';
import { PayloadExistsValidationPipe } from '@/common/pipes/payload-exists.pipe';
import { ContactStageResponseDto } from '../dto/contactStage/contactStage.response.dto';
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

@ApiTags('ContactStage')
@UseGuards(AuthGuard('jwt'))
@Controller('contactStage')
export class ContactStageController {
  constructor(private readonly contactStageService: ContactStageService) {}

  @ApiOperation({ summary: 'Create contactStage' })
  @ApiCreatedResponse({
    description: 'ContactStage created successfully!',
    type: ContactStageResponseDto,
  })
  @Post()
  async createContactStage(
    @AuthedUser() authedUser: IAuthedUser,
    @Body() body: CreateContactStageRequestDto,
  ) {
    try {
      const contactStage = await this.contactStageService.create(
        body,
        authedUser.userId,
      );

      return new SuccessResponseObject(
        'ContactStage created successfully!',
        contactStage,
      );
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Update contactStage by id' })
  @ApiOkResponse({ description: 'ContactStage updated successfully!' })
  @Put(':id')
  async updateContactStage(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
    @Body(PayloadExistsValidationPipe) body: UpdateContactStageRequestDto,
  ) {
    try {
      const contactStage = await this.contactStageService.update(
        id,
        body,
        authedUser.userId,
      );

      return new SuccessResponseObject(
        'ContactStage updated successfully!',
        contactStage,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Get all contactStages' })
  @ApiOkResponse({
    description: 'ContactStages fetched successfully!',
    type: [ContactStageResponseDto],
  })
  @Get()
  async getContactStages(@AuthedUser() authedUser: IAuthedUser) {
    try {
      const contactStages = await this.contactStageService.findAll();

      return new SuccessResponseObject(
        'ContactStages fetched successfully!',
        contactStages,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Get contactStage by id' })
  @ApiOkResponse({
    description: 'ContactStage fetched successfully!',
    type: ContactStageResponseDto,
  })
  @Get(':id')
  async getContactStage(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
  ) {
    try {
      const contactStage = await this.contactStageService.findOne(id);

      return new SuccessResponseObject(
        'ContactStage fetched successfully!',
        contactStage,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Delete contactStage by id' })
  @ApiNoContentResponse({ description: 'ContactStage successfully deleted!' })
  @Delete(':id')
  async deleteContactStage(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
  ) {
    try {
      await this.contactStageService.delete(id, authedUser.userId);

      return new SuccessResponseObject('ContactStage successfully deleted!');
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      throw new InternalServerErrorException();
    }
  }
}
