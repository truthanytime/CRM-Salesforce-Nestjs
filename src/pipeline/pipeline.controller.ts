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
import { pipelineService } from './services/pipeline.service';
import { CreatepipelineRequestDto } from './dto/create-pipeline.request.dto';
import { UpdatepipelineRequestDto } from './dto/update-pipeline.request.dto';
import { SuccessResponseObject } from '../common/http';
import { PayloadExistsValidationPipe } from '@/common/pipes/payload-exists.pipe';
import { pipelineResponseDto } from './dto/pipeline.response.dto';
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
import { PipelineRepository } from './repositories/pipeline.repository';
import { ResourceResponseDto } from '@/resource/dto/resource.response.dto';

@ApiTags('Pipeline')
@UseGuards(AuthGuard('jwt'))
@Controller('pipeline')
export class pipelineController {
  constructor(
    private readonly pipelineService: pipelineService,
    private readonly pipelineRepository: PipelineRepository,
  ) {}

  @ApiOperation({ summary: 'Create pipeline' })
  @ApiCreatedResponse({
    description: 'Pipeline created successfully!',
    type: pipelineResponseDto,
  })
  @Post()
  async createpipeline(
    @AuthedUser() authedUser: IAuthedUser,
    @Body() body: CreatepipelineRequestDto,
  ) {
    try {
      const pipeline = await this.pipelineService.create(
        body,
        authedUser.userId,
      );

      return new SuccessResponseObject(
        'Pipeline created successfully!',
        pipeline,
      );
    } catch (error) {
      console.log('visit create pipeline:::', error);
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Update pipeline by id' })
  @ApiOkResponse({ description: 'Pipeline updated successfully!' })
  @Put(':id')
  async updatepipeline(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
    @Body(PayloadExistsValidationPipe) body: UpdatepipelineRequestDto,
  ) {
    try {
      const pipeline = await this.pipelineService.update(
        id,
        body,
        authedUser.userId,
      );

      return new SuccessResponseObject(
        'Pipeline updated successfully!',
        pipeline,
      );
    } catch (error) {
      console.log(':::Post:::', error);
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Get all pipelines' })
  @ApiOkResponse({
    description: 'pipelines fetched successfully!',
    type: [pipelineResponseDto],
  })
  @Get()
  async getpipelines(@AuthedUser() authedUser: IAuthedUser) {
    console.log('visit get all pipeline');
    try {
      const pipelines = await this.pipelineService.findAll(authedUser.userId);

      return new SuccessResponseObject(
        'pipelines fetched successfully!',
        pipelines,
      );
    } catch (error) {
      console.log(':::::error::::', error);
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Get pipeline by id' })
  @ApiOkResponse({
    description: 'Pipeline fetched successfully!',
    type: pipelineResponseDto,
  })
  @Get(':id')
  async getpipeline(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
  ) {
    try {
      const pipeline = await this.pipelineService.findOne(
        id,
        authedUser.userId,
      );

      return new SuccessResponseObject(
        'Pipeline fetched successfully!',
        pipeline,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Delete pipeline by id' })
  @ApiNoContentResponse({ description: 'Pipeline successfully deleted!' })
  @Delete(':id')
  async deletepipeline(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
  ) {
    try {
      await this.pipelineService.delete(id, authedUser.userId);

      return new SuccessResponseObject('Pipeline successfully deleted!');
    } catch (error) {
      console.log(':::delte::::', error);

      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Get all the resouces by pipline_id' })
  @ApiOkResponse({
    description: 'All the resources for any Pipeline fetched successfully!',
    type: [ResourceResponseDto],
  })
  @Get(':id/resources')
  async getAllResources(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
  ) {
    try {
      const resouces = await this.pipelineRepository.getAllResouces(
        authedUser.userId,
        id,
      );

      return new SuccessResponseObject(
        'All the resouces for pipline fetched successfully!',
        resouces,
      );
    } catch (error) {
      console.log(' fetching all the resources::::', error);
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      throw new InternalServerErrorException();
    }
  }
}
