import { ReportEntity } from '../../../../core/entities/report.entity';
import { ReportSummaryDto } from '../../dtos/report-summary.dto';

export function mapReportEntityToSummaryDto(
    entity: ReportEntity
): ReportSummaryDto | null {
    if (!entity) {
        return null;
    }

    return {
        id: entity.id || '',
        filename: entity.filename,
        type: entity.type,
        reportKind: entity.reportKind,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt
    };
}

export function mapReportEntitiesToSummaryDtos(
    entities: ReportEntity[]
): ReportSummaryDto[] {
    return (entities?.map(mapReportEntityToSummaryDto) ??
        []) as ReportSummaryDto[];
}
