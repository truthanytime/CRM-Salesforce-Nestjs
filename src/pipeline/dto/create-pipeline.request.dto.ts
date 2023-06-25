import { IsArray, IsOptional, IsString } from 'class-validator';
import { PipelineDocument } from '../entities/pipelineDocument.entity';
import { PipelineStage } from '../entities/pipelineStage.entity';
import { User } from '@/user/entities/user.entity';
import { Product } from '@/product/entities/product.entity';

export class CreatepipelineRequestDto {
  @IsString()
  pipelineName: string;

  @IsOptional()
  @IsString()
  pipelineDescription: string;

  @IsOptional()
  @IsArray()
  productIds: number[];

  @IsArray()
  pipelineStages: PipelineStage[];

  @IsOptional()
  @IsArray()
  pipelineDocuments: PipelineDocument[];

  @IsOptional()
  @IsArray()
  pipelineProducts: Product[];

  @IsOptional()
  @IsArray()
  pipelineUsers: User[];
}
