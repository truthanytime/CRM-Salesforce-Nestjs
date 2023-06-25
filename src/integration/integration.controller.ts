import { AuthedUser } from '@/auth/decorators/authed-user.decorator';
import { IAuthedUser } from '@/auth/types';
import { SuccessResponseObject } from '@/common/http';
import { GoogleAuthService } from '@/core/lib/google/google-auth.service';
import { ICallbackQueryParams, AppIds, IntegrationType } from '@/core/types';
import { UserType } from '@/user/types';
import { SalesforceAuthService } from '@/core/lib/salesforce/salesforce-auth.service';
import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IntegrationService } from './integration.service';

@Controller('integration')
export class IntegrationController {
  constructor(
    private integrationService: IntegrationService,
    private googleAuthService: GoogleAuthService,
    private salesforceAuthService: SalesforceAuthService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async list(@AuthedUser() authedUser: IAuthedUser) {
    const integrations = await this.integrationService.getIntegrationsApps(
      authedUser.userId,
      authedUser.tenantId,
    );
    return new SuccessResponseObject('success', integrations);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':appId')
  async getIntegration(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('appId') appId: AppIds,
  ) {
    const integration =
      await this.integrationService.getIntegrationWithInstallStatus(
        appId,
        authedUser.userId,
        authedUser.tenantId,
      );
    return new SuccessResponseObject('success', integration);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':appId/authorize')
  async authorize(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('appId') appId: AppIds,
  ) {
    await this.validateAuthorization(authedUser, appId);
    switch (appId) {
      case AppIds.GMAIL:
        const googleRedirectUrl = await this.googleAuthService.authorize(
          appId,
          authedUser,
        );
        return new SuccessResponseObject('success', googleRedirectUrl);
      case AppIds.SALESFORCE:
        const salesforceRedirectUrl =
          await this.salesforceAuthService.authorize(authedUser);
        return new SuccessResponseObject('success', salesforceRedirectUrl);
      default:
        throw new NotFoundException('Not implemented yet');
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':appId/uninstall')
  async uninstall(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('appId') appId: AppIds,
  ) {
    await this.validateAuthorization(authedUser, appId);
    const result = await this.integrationService.uninstall(
      appId,
      authedUser.userId,
      authedUser.tenantId,
    );
    return new SuccessResponseObject('success', result);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('callback/:appId')
  async handleAuthCallback(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('appId') appId: AppIds,
    @Query() query: ICallbackQueryParams,
  ) {
    await this.validateAuthorization(authedUser, appId);
    switch (appId) {
      case AppIds.GMAIL:
        await this.googleAuthService.handleAuthCallback(query, authedUser);
        return new SuccessResponseObject('success auth');
      case AppIds.SALESFORCE:
        await this.salesforceAuthService.handleAuthCallback(query, authedUser);
        return new SuccessResponseObject('success auth');
      default:
        throw new NotFoundException('integration callback not found');
    }
  }

  async validateAuthorization(authedUser: IAuthedUser, appId: AppIds) {
    const integration = await this.integrationService.getIntegration(appId);
    if (
      integration.type === IntegrationType.TENANT &&
      authedUser.userType === UserType.USER
    ) {
      throw new UnauthorizedException(
        'You are not authorized to update tenant level integrations',
      );
    }
    return integration;
  }
}
