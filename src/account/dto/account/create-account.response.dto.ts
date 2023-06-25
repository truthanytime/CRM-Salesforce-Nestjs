export class CreateAccountResponseDto {
  accountId: number;
  accountName: string;
  description: string;
  company: string;
  webURL: string;
  industryId: number;
  foundedDate: Date;
  employeesNumber: number;
  revenuePerYear: number;
  childOf: number;
  createDate: Date;
  createdBy: number;
}
