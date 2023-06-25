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
import { AccountStageService } from '../services/accountStage.service';
import { CreateAccountStageRequestDto } from '../dto/accountStage/create-accountStage.request.dto';
import { UpdateAccountStageRequestDto } from '../dto/accountStage/update-accountStage.request.dto';
import { SuccessResponseObject } from '@/common/http';
import { PayloadExistsValidationPipe } from '@/common/pipes/payload-exists.pipe';
import { AccountStageResponseDto } from '../dto/accountStage/accountStage.response.dto';
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

@ApiTags('AccountStage')
@UseGuards(AuthGuard('jwt'))
@Controller('accountStage')
export class AccountStageController {
  constructor(private readonly accountStageService: AccountStageService) {}

  @ApiOperation({ summary: 'Create accountStage' })
  @ApiCreatedResponse({
    description: 'AccountStage created successfully!',
    type: AccountStageResponseDto,
  })
  @Post()
  async createAccountStage(
    @AuthedUser() authedUser: IAuthedUser,
    @Body() body: CreateAccountStageRequestDto,
  ) {
    try {
      const accountStage = await this.accountStageService.create(
        body,
        authedUser.userId,
      );

      return new SuccessResponseObject(
        'AccountStage created successfully!',
        accountStage,
      );
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Update accountStage by id' })
  @ApiOkResponse({ description: 'AccountStage updated successfully!' })
  @Put(':id')
  async updateAccountStage(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
    @Body(PayloadExistsValidationPipe) body: UpdateAccountStageRequestDto,
  ) {
    try {
      const accountStage = await this.accountStageService.update(
        id,
        body,
        authedUser.userId,
      );

      return new SuccessResponseObject(
        'AccountStage updated successfully!',
        accountStage,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Get all accountStages' })
  @ApiOkResponse({
    description: 'AccountStages fetched successfully!',
    type: [AccountStageResponseDto],
  })
  @Get()
  async getAccountStages(@AuthedUser() authedUser: IAuthedUser) {
    try {
      const accountStages = await this.accountStageService.findAll();

      return new SuccessResponseObject(
        'AccountStages fetched successfully!',
        accountStages,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Get accountStage by id' })
  @ApiOkResponse({
    description: 'AccountStage fetched successfully!',
    type: AccountStageResponseDto,
  })
  @Get(':id')
  async getAccountStage(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
  ) {
    try {
      const accountStage = await this.accountStageService.findOne(id);

      return new SuccessResponseObject(
        'AccountStage fetched successfully!',
        accountStage,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Delete accountStage by id' })
  @ApiNoContentResponse({ description: 'AccountStage successfully deleted!' })
  @Delete(':id')
  async deleteAccountStage(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
  ) {
    try {
      await this.accountStageService.delete(id, authedUser.userId);

      return new SuccessResponseObject('AccountStage successfully deleted!');
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      throw new InternalServerErrorException();
    }
  }
}
