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
import { PermissionService } from './permission.service';
import { CreatePermissionRequestDto } from './dto/create-permission.request.dto';
import { UpdatePermissionRequestDto } from './dto/update-permission.request.dto';
import { SuccessResponseObject } from '../common/http';
import { PayloadExistsValidationPipe } from '@/common/pipes/payload-exists.pipe';
import { PermissionResponseDto } from './dto/permission.response.dto';
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

@ApiTags('Permission')
@UseGuards(AuthGuard('jwt'))
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @ApiOperation({ summary: 'Create permission' })
  @ApiCreatedResponse({
    description: 'Permission created successfully!',
    type: PermissionResponseDto,
  })
  @Post()
  async createPermission(
    @AuthedUser() authedUser: IAuthedUser,
    @Body() body: CreatePermissionRequestDto,
  ) {
    try {
      const permission = await this.permissionService.create(
        body,
        authedUser.userId,
      );

      return new SuccessResponseObject(
        'Permission created successfully!',
        permission,
      );
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Update permission by id' })
  @ApiOkResponse({ description: 'Permission updated successfully!' })
  @Put(':id')
  async updatePermission(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
    @Body(PayloadExistsValidationPipe) body: UpdatePermissionRequestDto,
  ) {
    try {
      const permission = await this.permissionService.update(
        id,
        body,
        authedUser.userId,
      );

      return new SuccessResponseObject(
        'Permission updated successfully!',
        permission,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Get all permissions' })
  @ApiOkResponse({
    description: 'Permissions fetched successfully!',
    type: [PermissionResponseDto],
  })
  @Get()
  async getPermissions(@AuthedUser() authedUser: IAuthedUser) {
    try {
      const permissions = await this.permissionService.findAll(
        authedUser.userId,
      );

      return new SuccessResponseObject(
        'Permissions fetched successfully!',
        permissions,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Get permission by id' })
  @ApiOkResponse({
    description: 'Permission fetched successfully!',
    type: PermissionResponseDto,
  })
  @Get(':id')
  async getPermission(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
  ) {
    try {
      const permission = await this.permissionService.findOne(
        id,
        authedUser.userId,
      );

      return new SuccessResponseObject(
        'Permission fetched successfully!',
        permission,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Delete permission by id' })
  @ApiNoContentResponse({ description: 'Permission successfully deleted!' })
  @Delete(':id')
  async deletePermission(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
  ) {
    try {
      await this.permissionService.delete(id, authedUser.userId);

      return new SuccessResponseObject('Permission successfully deleted!');
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      throw new InternalServerErrorException();
    }
  }
}
