import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtStrategy } from './jwt.strategy';
import { DEFAULT_JWT_STRATEGY_OPTIONS, IAuthedUser } from './types';

@Injectable()
export class JwtParamsStrategy extends PassportStrategy(
  Strategy,
  'jwt-params',
) {
  /*
   * Use delegation because too copmplicated to extends JwtStrategy directly
   */
  constructor(private readonly jwtStrategy: JwtStrategy) {
    super({
      ...DEFAULT_JWT_STRATEGY_OPTIONS,
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
    });
  }

  public async validate(payload: any): Promise<IAuthedUser> {
    return this.jwtStrategy.validate(payload);
  }
}
