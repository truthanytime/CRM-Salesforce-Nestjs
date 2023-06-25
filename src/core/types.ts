export enum APPLICATION_STATUS {
  INSTALLED = 'installed',
  NOT_INSTALLED = 'not-installed',
}

export enum INTEGRATION_SESSION_ID {
  GOOGLE = 'google-sessions',
}

export interface IntegrationSession {
  applicationStatus?: APPLICATION_STATUS;
  tokens: string | Record<string, any>;
  email?: string;
  accounId?: string;
  meta?: Record<string, any>;
}

export enum AppIds {
  GMAIL = 'gmail',
  GOOGLE_CALENDAR = 'google-calendar',
  SALESFORCE = 'salesforce',
  HUBSPOT = 'hubspot',
}

export enum DataMigrationStatus {
  REQUESTED = 'requested',
  DATA_SCHEMA_STARTED = 'schema-started',
  DATA_SCHEMA_COMPLETED = 'schema-completed',
  DATA_SCHEMA_FAILED = 'schema-failed',
  DATA_MIGRATION_STARTED = 'migration-started',
  DATA_MIGRATION_COMPLETED = 'migration-completed',
  DATA_MIGRATION_FAILED = 'migration-failed',
}

export enum IntegrationType {
  USER = 'user',
  TENANT = 'tenant',
}

export enum DataSourceType {
  USER = 'user',
  TENANT = 'tenant',
}

export interface ICallbackQueryParams {
  code?: string;
  scope?: string;
  state?: string;
}
