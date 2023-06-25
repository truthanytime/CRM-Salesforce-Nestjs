import {
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { baseStageService } from './basestage.service';
import { SuccessResponseObject } from '../common/http';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthedUser } from '@/auth/decorators/authed-user.decorator';
import { IAuthedUser } from '@/auth/types';
import { baseStageResponseDto } from './dto/basestage.response.dto';

@ApiTags('Basepipeline')
@UseGuards(AuthGuard('jwt'))
@Controller('basestage')
export class pipelineController {
  constructor(private readonly baseStageService: baseStageService) {}

  @ApiOperation({ summary: 'Get all base stages' })
  @ApiOkResponse({
    description: 'all the base stages fetched successfully!',
    type: [baseStageResponseDto],
  })
  @Get()
  async getpipelines(@AuthedUser() authedUser: IAuthedUser) {
    try {
      const pipelines = await this.baseStageService.findAll();

      return new SuccessResponseObject(
        'all the base stages fetched successfully!',
        pipelines,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }
      throw new InternalServerErrorException();
    }
  }
}
