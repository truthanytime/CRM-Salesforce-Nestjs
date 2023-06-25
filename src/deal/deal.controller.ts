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
import { DealService } from './deal.service';
import { CreateDealRequestDto } from './dto/create-deal.request.dto';
import { UpdateDealRequestDto } from './dto/update-deal.request.dto';
import { SuccessResponseObject } from '../common/http';
import { PayloadExistsValidationPipe } from '@/common/pipes/payload-exists.pipe';
import { DealResponseDto } from './dto/deal.response.dto';
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

@ApiTags('Deal')
@UseGuards(AuthGuard('jwt'))
@Controller('deal')
export class DealController {
  constructor(private readonly dealService: DealService) {}

  @ApiOperation({ summary: 'Create deal' })
  @ApiCreatedResponse({
    description: 'Deal created successfully!',
    type: DealResponseDto,
  })
  @Post()
  async createDeal(
    @AuthedUser() authedUser: IAuthedUser,
    @Body() body: CreateDealRequestDto,
  ) {
    try {
      const deal = await this.dealService.create(body, authedUser.userId);

      return new SuccessResponseObject('Deal created successfully!', deal);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Update deal by id' })
  @ApiOkResponse({ description: 'Deal updated successfully!' })
  @Put(':id')
  async updateDeal(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
    @Body(PayloadExistsValidationPipe) body: UpdateDealRequestDto,
  ) {
    try {
      const deal = await this.dealService.update(id, body, authedUser.userId);

      return new SuccessResponseObject('Deal updated successfully!', deal);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Get all deals' })
  @ApiOkResponse({
    description: 'Deals fetched successfully!',
    type: [DealResponseDto],
  })
  @Get()
  async getDeals(@AuthedUser() authedUser: IAuthedUser) {
    try {
      const deals = await this.dealService.findAll(authedUser.userId);

      return new SuccessResponseObject('Deals fetched successfully!', deals);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Get deal by id' })
  @ApiOkResponse({
    description: 'Deal fetched successfully!',
    type: DealResponseDto,
  })
  @Get(':id')
  async getDeal(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
  ) {
    try {
      const deal = await this.dealService.findOne(id, authedUser.userId);

      return new SuccessResponseObject('Deal fetched successfully!', deal);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Delete deal by id' })
  @ApiNoContentResponse({ description: 'Deal successfully deleted!' })
  @Delete(':id')
  async deleteDeal(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
  ) {
    try {
      await this.dealService.delete(id, authedUser.userId);

      return new SuccessResponseObject('Deal successfully deleted!');
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      throw new InternalServerErrorException();
    }
  }
}
