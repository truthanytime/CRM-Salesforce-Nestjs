import { Product } from '@/product/entities/product.entity';
import { User } from '@/user/entities/user.entity';
import { PipelineDocument } from '../entities/pipelineDocument.entity';
import { PipelineStage } from '../entities/pipelineStage.entity';

export class pipelineResponseDto {
  pipelineId: number;
  pipelineName: string;
  pipelineDescription: string;
  tenantId: number;
  creatorTenantUserId: number;
  isActive: boolean;
  createDate: Date;
  startDate: Date;
  endDate: Date;
  pipelineStages: PipelineStage[];
  pipelineDocuments: PipelineDocument[];
  pipelineProducts: Product[];
  pipelineUsers: User[];
}
