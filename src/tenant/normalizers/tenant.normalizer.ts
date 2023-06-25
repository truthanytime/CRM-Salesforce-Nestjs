import { Tenant } from '@/tenant/entities/tenant.entity';
import { AddressType } from '@/user/types';
import { TenantResponseDto } from '../dto/tenant.response.dto';

export const tenantNormalizer = {
  getTenantResponseDto(tenant: Tenant): TenantResponseDto {
    return {
      tenantId: tenant.tenantId,
      tenantName: tenant.tenantName,
      // industryId: tenant.industryId,
      webURL: tenant.webURL,
      employeesNumber: tenant.employeesNumber,
      suggestedDomain: tenant.suggestedDomain,
      createDate: tenant.createDate,
      subscriptionDate: tenant.subscriptionDate,
      ownerId: tenant.owner.userId,
      ownerName: tenant.owner.userName,
      ownerEmail: tenant.owner.userEmail,
      contactInfo: tenant.contactInfos.find(
        (info) => info.addressType === AddressType.MAILING && info.isCurrent,
      ),
      billingContactInfo: tenant.contactInfos.find(
        (info) => info.addressType === AddressType.BUSINESS && info.isCurrent,
      ),
    };
  },
};
