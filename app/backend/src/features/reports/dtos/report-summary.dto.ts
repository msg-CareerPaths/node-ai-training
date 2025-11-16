import { ApiProperty } from '@nestjs/swagger';
import { ReportType } from '../../../core/enums/report-type.enum';
import { ReportKind } from '../../../core/enums/report-kind.enum';

export class ReportSummaryDto {
    @ApiProperty({ description: 'Report identifier', format: 'uuid' })
    id: string;

    @ApiProperty({ description: 'Stored file name of the report' })
    filename: string;

    @ApiProperty({
        description: 'Format of the report file',
        enum: ReportType
    })
    type: ReportType;

    @ApiProperty({
        description:
            'Logical type of the report (e.g. revenue, most bought products)',
        enum: ReportKind
    })
    reportKind: ReportKind;

    @ApiProperty({
        description: 'Date when the report was created'
    })
    createdAt: Date;

    @ApiProperty({
        description: 'Date when the report was last updated'
    })
    updatedAt: Date;
}
