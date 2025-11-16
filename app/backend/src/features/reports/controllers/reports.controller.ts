import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Res,
    UseGuards
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiBody,
    ApiForbiddenResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse
} from '@nestjs/swagger';
import type { Response } from 'express';
import { ReportsService } from '../services/reports.service';
import { GenerateReportDto } from '../dtos/generate-report.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../../core/enums/user-roles.enum';
import { ReportSummaryDto } from '../dtos/report-summary.dto';
import { mapReportEntitiesToSummaryDtos } from '../utils/mappers/reports-mapper.utils';
import { ReportKind } from '../../../core/enums/report-kind.enum';

@ApiBearerAuth()
@ApiTags('Reports')
@Controller('reports')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) {}

    @Get()
    @Roles(UserRole.Admin)
    @ApiOperation({
        summary: 'List all generated reports metadata'
    })
    @ApiOkResponse({
        description: 'List of generated reports',
        type: ReportSummaryDto,
        isArray: true
    })
    @ApiForbiddenResponse({ description: 'Invalid permissions' })
    @ApiUnauthorizedResponse({
        description: 'Invalid authentication credentials.'
    })
    async listReports(): Promise<ReportSummaryDto[]> {
        const reports = await this.reportsService.listReports();
        return mapReportEntitiesToSummaryDtos(reports);
    }

    @Get(':id/download')
    @Roles(UserRole.Admin)
    @ApiOperation({
        summary: 'Download a specific generated report file'
    })
    @ApiOkResponse({
        description: 'Binary file containing the requested report',
        schema: {
            type: 'string',
            format: 'binary'
        }
    })
    @ApiForbiddenResponse({ description: 'Invalid permissions' })
    @ApiUnauthorizedResponse({
        description: 'Invalid authentication credentials.'
    })
    async downloadReport(
        @Param('id') id: string,
        @Res() res: Response
    ): Promise<void> {
        const { buffer, filename, mimeType } =
            await this.reportsService.getReportFile(id);

        res.setHeader('Content-Type', mimeType);
        res.setHeader(
            'Content-Disposition',
            `attachment; filename="${filename}"`
        );
        res.send(buffer);
    }

    @Post()
    @Roles(UserRole.Admin)
    @ApiOperation({
        summary: 'Generate a PDF or Excel report for a given report type'
    })
    @ApiBody({
        type: GenerateReportDto,
        description: 'Payload specifying the report type and desired format'
    })
    @ApiOkResponse({
        description: 'Binary file containing the generated report',
        schema: {
            type: 'string',
            format: 'binary'
        }
    })
    @ApiForbiddenResponse({ description: 'Invalid permissions' })
    @ApiUnauthorizedResponse({
        description: 'Invalid authentication credentials.'
    })
    async generateReport(
        @Body() dto: GenerateReportDto,
        @Res() res: Response
    ): Promise<void> {
        const result =
            dto.reportType === ReportKind.MostBoughtProducts
                ? await this.reportsService.generateMostBoughtProductsReport(
                      dto.format
                  )
                : await this.reportsService.generateRevenueReport(dto.format);

        const { buffer, filename, mimeType } = result;

        res.setHeader('Content-Type', mimeType);
        res.setHeader(
            'Content-Disposition',
            `attachment; filename="${filename}"`
        );
        res.send(buffer);
    }
}
