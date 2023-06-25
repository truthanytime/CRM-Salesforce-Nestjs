import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { APPLICATION_STATUS } from '@/core/types';
import { Integration } from './integration.entity';
import { IntegrationRepository } from './integration.repository';
import { IntegrationStateRepository } from './integrationState.repository';
import { AppIds } from '@/core/types';

@Injectable()
export class IntegrationService {
  constructor(
    private readonly integrationRepository: IntegrationRepository,
    private readonly integrationStateRepository: IntegrationStateRepository,
  ) {}

  async getIntegrationsApps(
    userId: number,
    tenantId: number,
  ): Promise<Integration[]> {
    const integrationsByUser =
      await this.integrationRepository.getIntegrationsWithStateByUser(userId);
    const integrationsByTenant =
      await this.integrationRepository.getIntegrationsWithStateByTenant(
        tenantId,
      );

    const allIntegrations = [...integrationsByUser, ...integrationsByTenant];

    return allIntegrations.map((integration) => {
      integration.applicationStatus = integration.integratedApps?.some(
        (app) => {
          return app.userId === userId || app.tenantId === tenantId;
        },
      )
        ? APPLICATION_STATUS.INSTALLED
        : APPLICATION_STATUS.NOT_INSTALLED;
      delete integration.integratedApps;
      return integration;
    });
  }

  async getIntegration(applicationId: AppIds) {
    const integration = await this.integrationRepository.findOne({
      where: { applicationId },
    });
    return integration;
  }

  async getIntegrationWithInstallStatus(
    applicationId: AppIds,
    userId: number,
    tenantId: number,
  ): Promise<Integration> {
    const integrationByUser =
      await this.integrationRepository.getOneIntegrationWithStateByUser(
        userId,
        applicationId,
      );
    const integrationByTenant =
      await this.integrationRepository.getOneIntegrationWithStateByTenant(
        tenantId,
        applicationId,
      );

    const integration =
      integrationByUser == null ? integrationByTenant : integrationByUser;
    if (!integration) throw new NotFoundException('Not integrated app yet');

    integration.applicationStatus = integration.integratedApps?.some(
      (app) => app.userId === userId || app.tenantId === tenantId,
    )
      ? APPLICATION_STATUS.INSTALLED
      : APPLICATION_STATUS.NOT_INSTALLED;
    delete integration.integratedApps;
    return integration;
  }

  async uninstall(
    appId: AppIds,
    userId: number,
    tenantId: number,
  ): Promise<void> {
    const integrationByUser =
      await this.integrationRepository.getOneIntegrationWithStateByUser(
        userId,
        appId,
      );
    const integrationByTenant =
      await this.integrationRepository.getOneIntegrationWithStateByTenant(
        tenantId,
        appId,
      );
    const integration =
      integrationByUser == null ? integrationByTenant : integrationByUser;
    if (!integration) throw new NotFoundException('Not integrated app yet');

    await this.integrationStateRepository.delete({ integration });
  }
}
