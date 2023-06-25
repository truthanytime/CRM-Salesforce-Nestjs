import { UserType } from '@/user/types';
import { passportJwtSecret } from 'jwks-rsa';
import env from '@/config/env.config';

export interface AuthCognitoUser {
  id: string;
  email: string;
}

export interface IAuthedUser {
  userId: number;
  userEmail: string;
  userType: UserType;
  tenantId?: number;
}

export const DEFAULT_JWT_STRATEGY_OPTIONS = {
  secretOrKeyProvider: passportJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${env().cognitoAuthority}/.well-known/jwks.json`,
  }),
  audience: env().cognitoClientId,
  issuer: env().cognitoAuthority,
  algorithms: ['RS256'],
};
