export interface GetIntegratedDataSourcesDto {
  data_source_id: string;
  name: string;
  integration_name_id: string;
  integration_id: string;
  integration_icon: string;
  integration_state_id: number;
  is_integrated: boolean;
  migration_status: string;
  migration_status_date: string;
  migration_id: string;
}
