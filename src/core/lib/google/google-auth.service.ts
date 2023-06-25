import { IAuthedUser } from '@/auth/types';
import env from '@/config/env.config';
import {
  FIREBASE_PROVIDER_TOKEN,
  IFirebaseProvider,
} from '@/core/lib/firebase/types';
import {
  APPLICATION_STATUS,
  IntegrationSession,
  INTEGRATION_SESSION_ID,
} from '@/core/types';
import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Auth, google } from 'googleapis';
import { GOOGLE_SCOPES } from './types';
import { AppIds, ICallbackQueryParams } from '../../types';

@Injectable()
export class GoogleAuthService {
  #oAuth2Client: Auth.OAuth2Client;

  constructor(
    @Inject(FIREBASE_PROVIDER_TOKEN)
    private readonly firebase: IFirebaseProvider,
  ) {}

  private getFrontendRedirectUrl(appId: string) {
    return env().frontEndUrl + '/d/integration-redirect/' + appId;
  }

  private getAppScopes(appId: AppIds) {
    const scopes = [...GOOGLE_SCOPES['default'], ...GOOGLE_SCOPES[appId]];
    return scopes;
  }

  private async saveUserSession(
    authedUser: IAuthedUser,
    session: IntegrationSession,
  ) {
    await this.firebase.db
      .collection(INTEGRATION_SESSION_ID.GOOGLE)
      .doc(String(authedUser.userId))
      .set(<IntegrationSession>{
        applicationStatus: session.applicationStatus,
        tokens: JSON.stringify(session.tokens),
        email: session.email,
      });
  }

  private async getToken(userId: number): Promise<Auth.Credentials> {
    try {
      const session = await this.getUserSession(userId);
      const tokens = <Auth.Credentials>JSON.parse(String(session.tokens));
      return tokens;
    } catch (_) {
      return Promise.resolve(null);
    }
  }

  async getUserSession(userId: number) {
    const getSession = await this.firebase.db
      .collection(INTEGRATION_SESSION_ID.GOOGLE)
      .doc(String(userId))
      .get();
    return <IntegrationSession>getSession?.data();
  }

  get oAuth2Client() {
    const client_id = env().googleApiClientId;
    const client_secret = env().googleApiClientSecret;
    // const redirect_uri = env().integrationAuthCallbackUri + '/google-callback';
    const redirect_uri = this.getFrontendRedirectUrl('gmail');
    if (!this.#oAuth2Client) {
      this.#oAuth2Client = new google.auth.OAuth2(
        client_id,
        client_secret,
        redirect_uri,
      );
    }
    return this.#oAuth2Client;
  }

  async getAuth(userId: number, tokens?: Auth.Credentials) {
    if (!tokens) {
      tokens = await this.getToken(userId);
    }
    if (!!tokens) {
      this.oAuth2Client.setCredentials(tokens);
      return this.oAuth2Client;
    }
  }

  async authorize(appId: AppIds, user: IAuthedUser): Promise<string> {
    console.log('user is: ', user);
    const tokens = await this.getToken(user.userId);
    const scopes = this.getAppScopes(appId);
    if (!tokens) {
      const authUrl = this.oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        include_granted_scopes: true,
        prompt: 'consent',
        state: `${user.userId}@${AppIds.GMAIL}`,
      });
      console.log('Authorize this app by visiting this url:', authUrl);
      return authUrl;
    }
    this.oAuth2Client.setCredentials(tokens);
    return this.getFrontendRedirectUrl(AppIds.GMAIL);
  }

  async handleAuthCallback(
    query: ICallbackQueryParams,
    authedUser: IAuthedUser,
  ) {
    const { code, state } = query;
    if (!code || !state)
      throw new BadRequestException('Invalid query parameters');
    const [userId] = state.split('@') ?? [];
    console.log('code is:', code);
    console.log('state is:', state);
    try {
      const { tokens } = await this.oAuth2Client.getToken(code);
      console.log('tokens is:', tokens);
      // ================
      const {
        email,
        sub,
        scopes: grantedScopes,
      } = await this.oAuth2Client.getTokenInfo(tokens.access_token);
      console.log('email is:', email);
      console.log('sub/userId is:', sub);
      await this.saveUserSession(authedUser, {
        applicationStatus: APPLICATION_STATUS.INSTALLED,
        tokens: tokens,
        email: email,
      });

      /*TODO Handle incremental scope*/
      console.log('scope is:', grantedScopes);
    } catch (err) {
      throw new HttpException('error authenticate token', err);
    }
  }
}
