export class TenantUpdateEventDto {
  tenantId: string;
  table: string;
  ruleIds?: string[];
  type: string;
}
