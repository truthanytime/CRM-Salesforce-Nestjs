import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { passportJwtSecret } from 'jwks-rsa';
import env from '@/config/env.config';
import { UserService } from '@/user/services/user.service';
import { UserType } from '@/user/types';
import { DEFAULT_JWT_STRATEGY_OPTIONS, IAuthedUser } from './types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(protected readonly userService: UserService) {
    super({
      ...DEFAULT_JWT_STRATEGY_OPTIONS,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  public async validate(payload: any): Promise<IAuthedUser> {
    if (!payload.sub) {
      throw new UnauthorizedException('Invalid user.');
    }

    const role: UserType = payload['cognito:groups'][0];

    if (role === UserType.SUPER_ADMIN) {
      return {
        userId: 0,
        userEmail: payload.email,
        userType: role,
      };
    }

    const user = await this.userService.findOne({
      userCognitoId: payload.sub,
      userActive: true,
    });

    if (!user) {
      throw new UnauthorizedException('Invalid user.');
    }

    return {
      userId: user.userId,
      userEmail: user.userEmail,
      userType: user.userType,
      tenantId: user.tenantId,
    };
  }
}
