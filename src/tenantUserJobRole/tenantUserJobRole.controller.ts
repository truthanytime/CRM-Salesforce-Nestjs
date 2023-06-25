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
import { TenantUserJobRoleService } from './tenantUserJobRole.service';
import { CreateTenantUserJobRoleRequestDto } from './dto/create-tenantUserJobRole.request.dto';
import { UpdateTenantUserJobRoleRequestDto } from './dto/update-tenantUserJobRole.request.dto';
import { SuccessResponseObject } from '../common/http';
import { PayloadExistsValidationPipe } from '@/common/pipes/payload-exists.pipe';
import { TenantUserJobRoleResponseDto } from './dto/tenantUserJobRole.response.dto';
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

@ApiTags('TenantUserJobRole')
@UseGuards(AuthGuard('jwt'))
@Controller('tenantUserJobRole')
export class TenantUserJobRoleController {
  constructor(
    private readonly tenantUserJobRoleService: TenantUserJobRoleService,
  ) {}

  @ApiOperation({ summary: 'Create tenantUserJobRole' })
  @ApiCreatedResponse({
    description: 'TenantUserJobRole created successfully!',
    type: TenantUserJobRoleResponseDto,
  })
  @Post()
  async createTenantUserJobRole(
    @AuthedUser() authedUser: IAuthedUser,
    @Body() body: CreateTenantUserJobRoleRequestDto,
  ) {
    try {
      const tenantUserJobRole = await this.tenantUserJobRoleService.create(
        body,
        authedUser.userId,
      );

      return new SuccessResponseObject(
        'TenantUserJobRole created successfully!',
        tenantUserJobRole,
      );
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Update tenantUserJobRole by id' })
  @ApiOkResponse({ description: 'TenantUserJobRole updated successfully!' })
  @Put(':id')
  async updateTenantUserJobRole(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
    @Body(PayloadExistsValidationPipe) body: UpdateTenantUserJobRoleRequestDto,
  ) {
    try {
      const tenantUserJobRole = await this.tenantUserJobRoleService.update(
        id,
        body,
        authedUser.userId,
      );

      return new SuccessResponseObject(
        'TenantUserJobRole updated successfully!',
        tenantUserJobRole,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Get all tenantUserJobRoles' })
  @ApiOkResponse({
    description: 'TenantUserJobRoles fetched successfully!',
    type: [TenantUserJobRoleResponseDto],
  })
  @Get()
  async getTenantUserJobRoles(@AuthedUser() authedUser: IAuthedUser) {
    try {
      const tenantUserJobRoles = await this.tenantUserJobRoleService.findAll(
        authedUser.userId,
      );

      return new SuccessResponseObject(
        'TenantUserJobRoles fetched successfully!',
        tenantUserJobRoles,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Get tenantUserJobRole by id' })
  @ApiOkResponse({
    description: 'TenantUserJobRole fetched successfully!',
    type: TenantUserJobRoleResponseDto,
  })
  @Get(':id')
  async getTenantUserJobRole(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
  ) {
    try {
      const tenantUserJobRole = await this.tenantUserJobRoleService.findOne(
        id,
        authedUser.userId,
      );

      return new SuccessResponseObject(
        'TenantUserJobRole fetched successfully!',
        tenantUserJobRole,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Delete tenantUserJobRole by id' })
  @ApiNoContentResponse({
    description: 'TenantUserJobRole successfully deleted!',
  })
  @Delete(':id')
  async deleteTenantUserJobRole(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
  ) {
    try {
      await this.tenantUserJobRoleService.delete(id, authedUser.userId);

      return new SuccessResponseObject(
        'TenantUserJobRole successfully deleted!',
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      throw new InternalServerErrorException();
    }
  }
}
