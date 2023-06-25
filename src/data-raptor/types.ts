export enum RuleStatus {
  REQUESTED = 'requested',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export enum RuleCategory {
  DuplicateDetection = "DuplicateDetection",
  MissingDataDetection = "MissingDataDetection",
  DataValidation = "DataValidation",
  DataConsistencyMonitoring = "DataConsistencyMonitoring",
  OutlierDetection = "OutlierDetection",
  DataIntegrityAuditing = "DataIntegrityAuditing",
  ChangeMonitoring = "ChangeMonitoring",
}

export enum RuleRiskLevel {
  Low = "Low",
  Medium = "Medium",
  High = "High"
}