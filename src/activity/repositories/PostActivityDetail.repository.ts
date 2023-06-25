import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { PostActivityDetail } from '../entities/postActivityDetail.entity';

@EntityRepository(PostActivityDetail)
export class PostActivityDetailRepository extends BaseRepository<PostActivityDetail> {}
