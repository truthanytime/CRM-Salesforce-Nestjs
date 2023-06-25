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
import { ResourceService } from './services/resource.service';
import { CreateResourceRequestDto } from './dto/create-resource.request.dto';
import { SuccessResponseObject } from '../common/http';
import { PayloadExistsValidationPipe } from '@/common/pipes/payload-exists.pipe';
import { ResourceResponseDto } from './dto/resource.response.dto';
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
import { UpdateResourceRequestDto } from './dto/update-resource.request.dto';

@ApiTags('Resource')
@UseGuards(AuthGuard('jwt'))
@Controller('resource')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @ApiOperation({ summary: 'Create Resource' })
  @ApiCreatedResponse({
    description: 'Resource created successfully!',
    type: ResourceResponseDto,
  })
  @Post()
  async createResource(
    @AuthedUser() authedUser: IAuthedUser,
    @Body() body: CreateResourceRequestDto,
  ) {
    try {
      const Resource = await this.resourceService.create(
        body,
        authedUser.userId,
      );

      return new SuccessResponseObject(
        'Resource created successfully!',
        Resource,
      );
    } catch (error) {
      console.log('visit create Resource:::', error);
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Delete Resource' })
  @ApiNoContentResponse({ description: 'Resource successfully deleted!' })
  @Delete(':id')
  async deleteResource(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
  ) {
    try {
      await this.resourceService.delete(id);
      return new SuccessResponseObject('Resource successfully deleted!');
    } catch (error) {
      console.log('visit create Resource:::', error);
      throw new InternalServerErrorException();
    }
  }

  // @ApiOperation({ summary: 'Get all resources for any pipeline' })
  // @ApiOkResponse({
  //   description: 'resources fetched successfully!',
  //   type: [ResourceResponseDto],
  // })
  // @Get(':id')
  // async getpipelines(@AuthedUser() authedUser: IAuthedUser) {
  //   console.log('visit get all pipeline');
  //   try {
  //     const resources = await this.resourceService.findAll(authedUser.userId);

  //     return new SuccessResponseObject(
  //       'resources fetched successfully!',
  //       resources,
  //     );
  //   } catch (error) {
  //     console.log(':::::error::::', error);
  //     if (error instanceof NotFoundException) {
  //       throw new NotFoundException(error);
  //     }
  //     throw new InternalServerErrorException();
  //   }
  // }

  @ApiOperation({ summary: 'Update resource by id' })
  @ApiOkResponse({ description: 'Resource updated successfully!' })
  @Put(':id')
  async updatepipeline(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
    @Body(PayloadExistsValidationPipe) body: UpdateResourceRequestDto,
  ) {
    try {
      const resource = await this.resourceService.update(
        id,
        body,
        authedUser.userId,
      );

      return new SuccessResponseObject(
        'Resource updated successfully!',
        resource,
      );
    } catch (error) {
      console.log(':::Post:::', error);
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      throw new InternalServerErrorException();
    }
  }
}
