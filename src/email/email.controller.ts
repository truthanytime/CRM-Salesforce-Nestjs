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
import { EmailService } from './email.service';
import { CreateEmailRequestDto } from './dto/create-email.request.dto';
import { SuccessResponseObject } from '../common/http';
import { PayloadExistsValidationPipe } from '@/common/pipes/payload-exists.pipe';
import { EmailResponseDto } from './dto/email.response.dto';
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

@ApiTags('Email')
@UseGuards(AuthGuard('jwt'))
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @ApiOperation({ summary: 'Create email' })
  @ApiCreatedResponse({
    description: 'Email created successfully!',
    type: EmailResponseDto,
  })
  @Post()
  async createEmail(
    @AuthedUser() authedUser: IAuthedUser,
    @Body() body: CreateEmailRequestDto,
  ) {
    try {
      const email = await this.emailService.create(body, authedUser.userId);

      return new SuccessResponseObject('Email created successfully!', email);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Get all emails' })
  @ApiOkResponse({
    description: 'Emails fetched successfully!',
    type: [EmailResponseDto],
  })
  @Get()
  async getEmails(@AuthedUser() authedUser: IAuthedUser) {
    try {
      const emails = await this.emailService.findAll();

      return new SuccessResponseObject('Emails fetched successfully!', emails);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Get email by id' })
  @ApiOkResponse({
    description: 'Email fetched successfully!',
    type: EmailResponseDto,
  })
  @Get(':id')
  async getEmail(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
  ) {
    try {
      const email = await this.emailService.findOne(id);

      return new SuccessResponseObject('Email fetched successfully!', email);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Delete email by id' })
  @ApiNoContentResponse({ description: 'Email successfully deleted!' })
  @Delete(':id')
  async deleteEmail(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
  ) {
    try {
      await this.emailService.delete(id, authedUser.userId);

      return new SuccessResponseObject('Email successfully deleted!');
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      throw new InternalServerErrorException();
    }
  }

  @Get('gmail/account')
  async getGmailAccount(@AuthedUser() authedUser: IAuthedUser) {
    const account = await this.emailService.getGmailAccount(
      Number(authedUser.userId),
    );
    return new SuccessResponseObject('Email fetched successfully!', account);
  }
}
