import {
  BadRequestException,
  Body,
  Controller,
  Logger,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SuccessResponseObject } from '../common/http';
import { LoginRequestDto } from './dto/login.request.dto';
import { ChangePasswordRequestDto } from './dto/change-password.request.dto';
import { SetPasswordRequestDto } from './dto/set-password.request.dto';
import { InitPasswordResetRequestDto } from './dto/init-password-reset.request.dto';
import { ConfirmPasswordResetDto } from './dto/confirm-password-reset.request.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginResponseDto } from './dto/login.response.dto';
import { SetPasswordResponseDto } from './dto/set-password.response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'User log in' })
  @ApiCreatedResponse({
    description: 'Successfully logged in.',
    type: LoginResponseDto,
  })
  @Post('login')
  async login(@Body() body: LoginRequestDto) {
    try {
      const authSession = await this.authService.authenticateUser(body);

      return new SuccessResponseObject('Successfully logged in.', authSession);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiOperation({ summary: 'User create new password and authenticate' })
  @ApiCreatedResponse({
    description: 'Successfully logged in.',
    type: SetPasswordResponseDto,
  })
  @Post('set-password')
  async setPassword(@Body() body: SetPasswordRequestDto) {
    try {
      const authSession = await this.authService.setNewPassword(body);

      return new SuccessResponseObject('Successfully logged in.', authSession);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiOperation({ summary: 'Initiate password reset' })
  @ApiCreatedResponse({ description: 'Successfully initiated password reset.' })
  @Post('password-reset/init')
  async initPasswordReset(@Body() body: InitPasswordResetRequestDto) {
    try {
      await this.authService.initPasswordReset(body.email);

      return new SuccessResponseObject(
        'Successfully initiated password reset.',
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiOperation({ summary: 'Confirm password reset and authenticate' })
  @ApiCreatedResponse({
    description: 'Password successfully changed.',
    type: LoginResponseDto,
  })
  @Post('password-reset/confirm')
  async confirmPasswordReset(@Body() body: ConfirmPasswordResetDto) {
    try {
      const authSession = await this.authService.confirmPasswordReset(
        body.token,
        body.password,
      );

      return new SuccessResponseObject(
        'Password successfully changed.',
        authSession,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiOperation({ summary: 'Change user password' })
  @ApiCreatedResponse({ description: 'Password successfully changed.' })
  @UseGuards(AuthGuard('jwt'))
  @Post('change-password')
  async changePassword(@Body() body: ChangePasswordRequestDto) {
    try {
      await this.authService.changePassword(body);

      return new SuccessResponseObject('Password successfully changed.');
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiOperation({ summary: 'Log user out' })
  @ApiCreatedResponse({ description: 'Successfully logout.' })
  @UseGuards(AuthGuard('jwt'))
  @Post('logout/:id')
  async logout(@Param('id') id: string) {
    try {
      await this.authService.signUserOut(id);
    } catch (error) {
      this.logger.error(`Sign user out error. ${error.message}.`, error.stack);
    }

    return new SuccessResponseObject('Successfully logout.');
  }
}
