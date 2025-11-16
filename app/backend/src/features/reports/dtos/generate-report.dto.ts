import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { ReportType } from '../../../core/enums/report-type.enum';
import { ReportKind } from '../../../core/enums/report-kind.enum';

export class GenerateReportDto {
    @ApiProperty({
        description: 'Format of the generated report',
        enum: ReportType
    })
    @IsEnum(ReportType)
    format: ReportType;

    @ApiProperty({
        description: 'Type of report to generate',
        enum: ReportKind
    })
    @IsEnum(ReportKind)
    reportType: ReportKind;
}
