import env from '@/config/env.config';
import { IntegrationSession } from '@/core/types';
import { IntegrationRepository } from '@/integration/integration.repository';
import { IntegrationStateRepository } from '@/integration/integrationState.repository';
import { UserRepository } from '@/user/repositories/user.repository';
import { HttpException, Injectable } from '@nestjs/common';
import { Connection, OAuth2, UserInfo } from 'jsforce';
import { AppIds, ICallbackQueryParams } from '../../types';
import { KmsManagerService } from '@/core/lib/aws/kms/kms-manager.service';
import { IAuthedUser } from '@/auth/types';

@Injectable()
export class SalesforceAuthService {
  #oAuth2Client: OAuth2;

  constructor(
    private readonly userRepository: UserRepository,
    private readonly integrationRepository: IntegrationRepository,
    private readonly integrationStateRepository: IntegrationStateRepository,
    private readonly kmsManagerService: KmsManagerService,
  ) {}

  private getFrontendRedirectUrl() {
    return env().frontEndUrl + '/d/integration-redirect/' + AppIds.SALESFORCE;
  }

  private async getIntegrationData(tenantId: number) {
    const integration =
      await this.integrationRepository.getOneIntegrationWithStateByTenant(
        tenantId,
        AppIds.SALESFORCE,
      );
    const integrationState = integration.integratedApps?.find(
      (app) => app.tenantId === tenantId,
    );
    return { integration, integrationState };
  }

  private async saveUserSession(
    authedUser: IAuthedUser,
    session: IntegrationSession,
  ) {
    const { integration, integrationState } = await this.getIntegrationData(
      authedUser.tenantId,
    );
    if (integrationState) {
      await this.integrationStateRepository.update(integrationState.id, {
        session,
      });
      return;
    }
    await this.integrationStateRepository.insert({
      tenantId: authedUser.tenantId,
      integration,
      session,
    });
  }

  get oAuth2Client() {
    if (!this.#oAuth2Client) {
      this.#oAuth2Client = new OAuth2({
        clientId: env().salesforceConsumerKey,
        clientSecret: env().salesforceConsumerSecret,
        redirectUri: this.getFrontendRedirectUrl(),
      });
    }
    return this.#oAuth2Client;
  }

  private connection(instanceUrl: string, accessToken: string) {
    return new Connection({
      instanceUrl,
      accessToken,
    });
  }

  async authorize(authedUser: IAuthedUser): Promise<string> {
    const { integrationState } = await this.getIntegrationData(
      authedUser.tenantId,
    );
    const scopes = this.getAppScopes();
    if (!integrationState?.session?.tokens) {
      const authUrl = this.oAuth2Client.getAuthorizationUrl({
        scope: scopes.join(' '),
        state: `${authedUser.userId}@${AppIds.SALESFORCE}`,
      });
      console.log('Authorize this app by visiting this url:', authUrl);
      return authUrl;
    }
    return this.getFrontendRedirectUrl();
  }

  getAppScopes() {
    return [
      'id',
      'profile',
      'email',
      'address',
      'phone',
      'api',
      'web',
      'refresh_token',
      'offline_access',
      'openid',
      'custom_permissions',
      'wave_api',
      'content',
      'cdp_ingest_api',
      'cdp_profile_api',
      'cdp_query_api',
      'cdp_segment_api',
      // 'cdp_identity_resolution_api',
      // 'cdp_calculated_insight_api',
    ];
  }

  async handleAuthCallback(
    query: ICallbackQueryParams,
    authedUser: IAuthedUser,
  ) {
    const { code, state } = query;
    console.log('state is:', state);
    const userId = Number(state?.split('@')[0]);
    try {
      if (isNaN(userId)) return;
      const conn = new Connection({
        oauth2: this.oAuth2Client,
      });

      let userInfo: UserInfo;
      try {
        userInfo = await conn.authorize(code);
        console.log('authorized userInfo:', userInfo);
      } catch (err) {
        console.log('authorized err:', err);
        return;
      }

      const conn2 = new Connection({
        oauth2: this.oAuth2Client,
        instanceUrl: conn.instanceUrl,
        accessToken: conn.accessToken,
        refreshToken: conn.refreshToken,
      });

      const userIdentity = await conn2.identity();

      const accessTokenEncrypted = await this.kmsManagerService.encrypt(
        env().integrationSessionKmsKeyId,
        conn2.accessToken,
      );

      const refreshTokenEncrypted = await this.kmsManagerService.encrypt(
        env().integrationSessionKmsKeyId,
        conn2.refreshToken,
      );

      await this.saveUserSession(authedUser, {
        tokens: {
          accessToken: accessTokenEncrypted,
          refreshToken: refreshTokenEncrypted,
          instanceUrl: conn2.instanceUrl,
        },
        email: userIdentity.email,
        accounId: userInfo?.id,
        meta: userInfo,
      });
    } catch (err) {
      throw new HttpException('error authenticate token', err);
    }
  }
}
