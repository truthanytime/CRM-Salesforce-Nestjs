import {
  Controller,
  UseGuards,
  Get,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { DataSourceService } from './data-source.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SuccessResponseObject } from '@/common/http';
import { AuthedUser } from '@/auth/decorators/authed-user.decorator';
import { IAuthedUser } from '@/auth/types';

@ApiTags('DataSource')
@UseGuards(AuthGuard('jwt'))
@Controller('DataSource')
export class DataSourceController {
  constructor(private readonly dataSourceService: DataSourceService) {}

  @Get()
  @ApiOperation({ summary: 'Get all available data sources to connect with' })
  async getAllDataSources() {
    const dataSources = await this.dataSourceService.findAll({
      relations: ['integration'],
    });
    return new SuccessResponseObject('Data Sources Retrieved', dataSources);
  }

  @Get('/available')
  @ApiOperation({
    summary: 'Get all available data sources that user is integrated with',
  })
  async getIntegratedDataSources(@AuthedUser() authedUser: IAuthedUser) {
    const dataSources = await this.dataSourceService.getAvailableDataSources(
      authedUser.userId,
      authedUser.tenantId,
    );
    return new SuccessResponseObject('Data Sources Retrieved', dataSources);
  }

  @Get('/integration/:integrationId')
  @ApiOperation({
    summary:
      'Get Data sources base on an integration id e.g.(salesforce, google, etc)',
  })
  async getDataSourceFromIntegrationId(
    @Param('integrationId') integrationId: string,
  ) {
    const dataSources = await this.dataSourceService.findOne({
      where: { integrationId },
    });
    if (!dataSources) {
      throw new NotFoundException('Data source not found');
    }
    return new SuccessResponseObject('Data Source Retrieved', dataSources);
  }
}
