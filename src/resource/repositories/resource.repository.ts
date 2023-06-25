import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { Resource } from '../entities/resource.entity';

@EntityRepository(Resource)
export class ResourceRepository extends BaseRepository<Resource> {
  async findAll(userId, pipelineId) {
    return await this.find({
      where: { userId: userId, pipelineId: pipelineId },
    });
  }
}
