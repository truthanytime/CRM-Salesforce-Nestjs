import { Resource } from '@/resource/entities/resource.entity';
import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { Pipeline } from '../entities/pipeline.entity';

@EntityRepository(Pipeline)
export class PipelineRepository extends BaseRepository<Pipeline> {
  async getAllResouces(userId, pipelineId) {
    const resources = this.manager.getRepository(Resource).find({
      where: { createdBy: userId, pipelineId: pipelineId },
    });

    return resources || [];
  }
}
