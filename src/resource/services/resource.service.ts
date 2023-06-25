import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateResourceRequestDto } from '../dto/create-resource.request.dto';
import { ResourceResponseDto } from '../dto/resource.response.dto';
import { UpdateResourceRequestDto } from '../dto/update-resource.request.dto';
import { ResourceRepository } from '../repositories/resource.repository';

@Injectable()
export class ResourceService {
  constructor(private readonly resourceRepository: ResourceRepository) {}

  async create(
    data: CreateResourceRequestDto,
    ownerId: number,
  ): Promise<ResourceResponseDto> {
    const insertable = {
      ...data,
      createdBy: ownerId,
      isActive: true,
    };

    const Resource = this.resourceRepository.create(insertable);

    const savedResource = await this.resourceRepository.save(Resource);

    return savedResource;
  }

  async findAll(
    userId: number,
    pipelineId: number,
  ): Promise<ResourceResponseDto[]> {
    const ResourceResponse: ResourceResponseDto[] =
      await this.resourceRepository.find({
        where: { creator: userId, piplineId: pipelineId },
      });
    return ResourceResponse;
  }

  async delete(id: number): Promise<void> {
    const resource = await this.resourceRepository.findOne(id);
    if (!resource) {
      throw new NotFoundException('Resource not found!');
    }

    await this.resourceRepository.remove([resource]);
  }

  async update(id: number, data: UpdateResourceRequestDto, ownerId: number) {
    const existing = await this.resourceRepository.findOne(id);
    if (!existing) {
      throw new NotFoundException('Resource not found!');
    }

    const updated = { ...existing, ...data };

    const res = await this.resourceRepository.save(updated);
    return res;
  }
}
