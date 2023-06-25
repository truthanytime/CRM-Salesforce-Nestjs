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
import { UserService } from './services/user.service';
import { CreateUserRequestDto } from './dto/create-user.request.dto';
import { SuccessResponseObject } from '../common/http';
import { PayloadExistsValidationPipe } from '@/common/pipes/payload-exists.pipe';
import { UpdateUserRequestDto } from './dto/update-user-request.dto';
import { AuthedUser } from '@/auth/decorators/authed-user.decorator';
import { IAuthedUser } from '@/auth/types';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { UserResponseDto } from './dto/user.response.dto';
import { CreateUserResponseDto } from './dto/create-user.response.dto';

@ApiTags('User')
@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiCreatedResponse({
    description: 'User created successfully!',
    type: CreateUserResponseDto,
  })
  @Post()
  async createUser(
    @AuthedUser() authedUser: IAuthedUser,
    @Body() body: CreateUserRequestDto,
  ) {
    try {
      const user = await this.userService.create(body, authedUser.userId);

      return new SuccessResponseObject('User created successfully!', user);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({
    description: 'Users fetched successfully!',
    type: [UserResponseDto],
  })
  @Get()
  async getUsers(@AuthedUser() authedUser: IAuthedUser) {
    try {
      const users = await this.userService.findAll(
        authedUser.tenantId as number,
      );

      return new SuccessResponseObject('Users fetched successfully!', users);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiOkResponse({
    description: 'User fetched successfully!',
    type: UserResponseDto,
  })
  @Get(':id')
  async getUser(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
  ) {
    try {
      const user = await this.userService.findOne(
        { userId: id },
        authedUser.userId,
      );

      return new SuccessResponseObject('User fetched successfully!', user);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Get current authenticated user' })
  @ApiOkResponse({
    description: 'Current user fetched successfully!',
    type: UserResponseDto,
  })
  @Get('auth/current')
  async getCurrentUser(@AuthedUser() authedUser: IAuthedUser) {
    try {
      const user = await this.userService.findOne({
        userId: authedUser.userId,
      });

      return new SuccessResponseObject(
        'Current user fetched successfully!',
        user,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Update user by id' })
  @ApiOkResponse({ description: 'User updated successfully!' })
  @Put(':id')
  async updateUser(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
    @Body(PayloadExistsValidationPipe) body: UpdateUserRequestDto,
  ) {
    try {
      await this.userService.update(id, body, authedUser.userId);

      return new SuccessResponseObject('User updated successfully!');
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Delete user by id' })
  @ApiNoContentResponse({ description: 'User successfully deleted!' })
  @Delete(':id')
  async deleteUser(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
  ) {
    try {
      await this.userService.delete(id, authedUser.userId);

      return new SuccessResponseObject('User successfully deleted!');
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Inactivate user by id' })
  @ApiOkResponse({ description: 'User successfully inactivated!' })
  @Put(':id/inactivate')
  async inactivateUser(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
  ) {
    try {
      await this.userService.inactivate(
        id,
        authedUser.userId,
        authedUser.tenantId as number,
      );

      return new SuccessResponseObject('User successfully inactivated!');
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Reactivate user by id' })
  @ApiOkResponse({ description: 'User successfully reactivated!' })
  @Put(':id/reactivate')
  async reactivateUser(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: number,
  ) {
    try {
      await this.userService.reactivate(
        id,
        authedUser.userId,
        authedUser.tenantId as number,
      );

      return new SuccessResponseObject('User successfully reactivated!');
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }

      throw new InternalServerErrorException();
    }
  }
}
