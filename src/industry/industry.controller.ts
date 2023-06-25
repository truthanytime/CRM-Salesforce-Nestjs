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
import { IndustryService } from './industry.service';
import { CreateIndustryRequestDto } from './dto/create-industry.request.dto';
import { UpdateIndustryRequestDto } from './dto/update-industry.request.dto';
import { SuccessResponseObject } from '@/common/http';
import { PayloadExistsValidationPipe } from '@/common/pipes/payload-exists.pipe';
import { IndustryResponseDto } from './dto/industry.response.dto';
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

@ApiTags('Industry')
@UseGuards(AuthGuard('jwt'))
@Controller('industry')
export class IndustryController {
  constructor(private readonly industryService: IndustryService) {}

  @ApiOperation({ summary: 'Create industry' })
  @ApiCreatedResponse({
    description: 'Industry created successfully!',
    type: IndustryResponseDto,
  })
  @Post()
  async createIndustry(
    @AuthedUser() authedUser: IAuthedUser,
    @Body() body: CreateIndustryRequestDto,
  ) {
    try {
      const industry = await this.industryService.create(
        body,
        authedUser.userId,
      );

      return new SuccessResponseObject(
        'Industry created successfully!',
        industry,
      );
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Update industry by id' })
  @ApiOkResponse({ description: 'Industry updated successfully!' })
  @Put(':id')
  async updateIndustry(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
    @Body(PayloadExistsValidationPipe) body: UpdateIndustryRequestDto,
  ) {
    try {
      const industry = await this.industryService.update(
        id,
        body,
        authedUser.userId,
      );

      return new SuccessResponseObject(
        'Industry updated successfully!',
        industry,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Get all industrys' })
  @ApiOkResponse({
    description: 'Industrys fetched successfully!',
    type: [IndustryResponseDto],
  })
  @Get()
  async getIndustrys(@AuthedUser() authedUser: IAuthedUser) {
    try {
      const industrys = await this.industryService.findAll();

      return new SuccessResponseObject(
        'Industrys fetched successfully!',
        industrys,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Get industry by id' })
  @ApiOkResponse({
    description: 'Industry fetched successfully!',
    type: IndustryResponseDto,
  })
  @Get(':id')
  async getIndustry(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
  ) {
    try {
      const industry = await this.industryService.findOne(id);

      return new SuccessResponseObject(
        'Industry fetched successfully!',
        industry,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Delete industry by id' })
  @ApiNoContentResponse({ description: 'Industry successfully deleted!' })
  @Delete(':id')
  async deleteIndustry(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
  ) {
    try {
      await this.industryService.delete(id, authedUser.userId);

      return new SuccessResponseObject('Industry successfully deleted!');
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      throw new InternalServerErrorException();
    }
  }
}
