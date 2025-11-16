import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from '../../../core/entities/order.entity';
import { OrderItemEntity } from '../../../core/entities/order-item.entity';
import { ReportEntity } from '../../../core/entities/report.entity';
import { ReportType } from '../../../core/enums/report-type.enum';
import { ReportKind } from '../../../core/enums/report-kind.enum';
import {
    buildReportsMostBoughtProductsHtml,
    buildReportsRevenueHtml
} from '../utils/reports-pdf.utils';
import {
    buildMostBoughtProductsExcelSheet,
    buildRevenueExcelSheet
} from '../utils/reports-excel.utils';
import { GeneratedReport, MostBoughtProductView } from '../types/reports.types';
import { ReportsGenerationService } from './reports-generation.service';

@Injectable()
export class ReportsService {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderRepository: Repository<OrderEntity>,
        @InjectRepository(OrderItemEntity)
        private readonly orderItemRepository: Repository<OrderItemEntity>,
        @InjectRepository(ReportEntity)
        private readonly reportRepository: Repository<ReportEntity>,
        private readonly reportsGenerationService: ReportsGenerationService
    ) {}

    async generateRevenueReport(format: ReportType): Promise<GeneratedReport> {
        const totalRevenue = await this.calculateTotalRevenue();

        let result: GeneratedReport;
        if (format === ReportType.Pdf) {
            result = await this.generatePdfReport(totalRevenue);
        } else if (format === ReportType.Excel) {
            result = await this.generateExcelReport(totalRevenue);
        } else {
            // Fallback to PDF if somehow an unsupported format gets through
            result = await this.generatePdfReport(totalRevenue);
        }

        const report = this.reportRepository.create({
            filename: result.filename,
            type: format,
            reportKind: ReportKind.Revenue,
            data: result.buffer
        });
        await this.reportRepository.save(report);

        return result;
    }

    async listReports(): Promise<ReportEntity[]> {
        return this.reportRepository.find({
            order: { createdAt: 'DESC' }
        });
    }

    async getReportFile(reportId: string): Promise<GeneratedReport> {
        const report = await this.reportRepository.findOne({
            where: { id: reportId }
        });

        if (!report) {
            throw new NotFoundException(
                `Report with id "${reportId}" not found`
            );
        }

        const mimeType =
            report.type === ReportType.Pdf
                ? 'application/pdf'
                : report.type === ReportType.Excel
                  ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                  : 'application/octet-stream';

        return {
            buffer: report.data,
            filename: report.filename,
            mimeType
        };
    }

    async generateMostBoughtProductsReport(
        format: ReportType
    ): Promise<GeneratedReport> {
        const products = await this.calculateMostBoughtProducts();

        let result: GeneratedReport;
        if (format === ReportType.Pdf) {
            result = await this.generateMostBoughtProductsPdf(products);
        } else if (format === ReportType.Excel) {
            result = await this.generateMostBoughtProductsExcel(products);
        } else {
            result = await this.generateMostBoughtProductsPdf(products);
        }

        const report = this.reportRepository.create({
            filename: result.filename,
            type: format,
            reportKind: ReportKind.MostBoughtProducts,
            data: result.buffer
        });
        await this.reportRepository.save(report);

        return result;
    }

    private async calculateTotalRevenue(): Promise<number> {
        const result = await this.orderRepository
            .createQueryBuilder('order')
            .select('COALESCE(SUM(order.totalPrice), 0)', 'total')
            .getRawOne<{ total: string | null }>();

        return Number(result?.total ?? 0);
    }

    private async calculateMostBoughtProducts(): Promise<
        MostBoughtProductView[]
    > {
        const rows = await this.orderItemRepository
            .createQueryBuilder('item')
            .innerJoin('item.product', 'product')
            .select('product.name', 'productName')
            .addSelect('SUM(item.quantity)', 'totalQuantity')
            .addSelect(
                'SUM(item.quantity * item.priceAtPurchase)',
                'totalRevenue'
            )
            .groupBy('product.id')
            .addGroupBy('product.name')
            .orderBy('SUM(item.quantity)', 'DESC')
            .getRawMany<{
                productName: string;
                totalQuantity: string;
                totalRevenue: string;
            }>();

        return rows.map(row => ({
            productName: row.productName,
            totalQuantity: Number(row.totalQuantity ?? 0),
            totalRevenue: Number(row.totalRevenue ?? 0)
        }));
    }

    private async generatePdfReport(
        totalRevenue: number
    ): Promise<GeneratedReport> {
        const html = buildReportsRevenueHtml(totalRevenue);
        return this.reportsGenerationService.generatePdfFromHtml(
            html,
            'revenue-report'
        );
    }

    private async generateExcelReport(
        totalRevenue: number
    ): Promise<GeneratedReport> {
        const { sheetName, columns, rows } =
            buildRevenueExcelSheet(totalRevenue);

        return this.reportsGenerationService.generateExcelFromRows(
            sheetName,
            columns,
            rows,
            'revenue-report'
        );
    }

    private async generateMostBoughtProductsPdf(
        products: MostBoughtProductView[]
    ): Promise<GeneratedReport> {
        const html = buildReportsMostBoughtProductsHtml(products);
        return this.reportsGenerationService.generatePdfFromHtml(
            html,
            'most-bought-products-report'
        );
    }

    private async generateMostBoughtProductsExcel(
        products: MostBoughtProductView[]
    ): Promise<GeneratedReport> {
        const { sheetName, columns, rows } =
            buildMostBoughtProductsExcelSheet(products);

        return this.reportsGenerationService.generateExcelFromRows(
            sheetName,
            columns,
            rows,
            'most-bought-products-report'
        );
    }
}
