import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { PasswordResetToken } from '../entities/password-reset-token.entity';

@EntityRepository(PasswordResetToken)
export class PasswordResetTokenRepository extends BaseRepository<PasswordResetToken> {}
