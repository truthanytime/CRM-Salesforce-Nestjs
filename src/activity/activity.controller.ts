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
  Query,
  UseGuards,
} from '@nestjs/common';
import { ActivityService } from './activity.service';
import { CreateActivityRequestDto } from './dto/create-activity.request.dto';
import { UpdateActivityRequestDto } from './dto/update-activity.request.dto';
import { SuccessResponseObject } from '../common/http';
import { PayloadExistsValidationPipe } from '@/common/pipes/payload-exists.pipe';
import { ActivityResponseDto } from './dto/activity.response.dto';
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

@ApiTags('Activity')
@UseGuards(AuthGuard('jwt'))
@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @ApiOperation({ summary: 'Create activity' })
  @ApiCreatedResponse({
    description: 'Activity created successfully!',
    type: ActivityResponseDto,
  })
  @Post()
  async createActivity(
    @AuthedUser() authedUser: IAuthedUser,
    @Body() body: CreateActivityRequestDto,
  ) {
    try {
      const activity = await this.activityService.create(
        body,
        authedUser.userId,
      );

      return new SuccessResponseObject(
        'Activity created successfully!',
        activity,
      );
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Update activity by id' })
  @ApiOkResponse({ description: 'Activity updated successfully!' })
  @Put(':id')
  async updateActivity(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
    @Body(PayloadExistsValidationPipe) body: UpdateActivityRequestDto,
  ) {
    try {
      const activity = await this.activityService.update(
        id,
        body,
        authedUser.userId,
      );

      return new SuccessResponseObject(
        'Activity updated successfully!',
        activity,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Get all activitys' })
  @ApiOkResponse({
    description: 'Activitys fetched successfully!',
    type: [ActivityResponseDto],
  })
  @Get()
  async getActivitys(
    @AuthedUser() authedUser: IAuthedUser,
    @Query() query: { contactId: number },
  ) {
    try {
      const activitys = await this.activityService.findAll(
        authedUser.userId,
        query?.contactId,
      );

      return new SuccessResponseObject(
        'Activitys fetched successfully!',
        activitys,
      );
    } catch (error) {
      console.log('ERROR FIND ACTIVITIES', error);
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }
      throw new InternalServerErrorException(error);
    }
  }

  @ApiOperation({ summary: 'Get activity by id' })
  @ApiOkResponse({
    description: 'Activity fetched successfully!',
    type: ActivityResponseDto,
  })
  @Get(':id')
  async getActivity(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
  ) {
    try {
      const activity = await this.activityService.findOne(
        id,
        authedUser.userId,
      );

      return new SuccessResponseObject(
        'Activity fetched successfully!',
        activity,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Delete activity by id' })
  @ApiNoContentResponse({ description: 'Activity successfully deleted!' })
  @Delete(':id')
  async deleteActivity(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
  ) {
    try {
      await this.activityService.delete(id, authedUser.userId);

      return new SuccessResponseObject('Activity successfully deleted!');
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      throw new InternalServerErrorException();
    }
  }
}
