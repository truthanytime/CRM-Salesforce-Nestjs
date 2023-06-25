export class RuleApplierSqsMessageDto {
  userId: number;
  tenantId: number;
  migrationId: string;
  ruleIds: string[];
  action: RuleApplierActions;
}

export enum RuleApplierActions {
  APPLY = 'apply',
  REMOVE = 'remove',
  UPDATE = 'update',
}
