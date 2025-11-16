export interface GenerateReportDto {
  format: string;
  reportType: string;
}

export interface ReportSummaryDto {
  id: string;
  filename: string;
  type: string;
  reportKind: string;
  createdAt: string;
  updatedAt: string;
}
