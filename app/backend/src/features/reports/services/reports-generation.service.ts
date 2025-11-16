import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import * as ExcelJS from 'exceljs';
import { GeneratedReport } from '../types/reports.types';

@Injectable()
export class ReportsGenerationService {
    async generatePdfFromHtml(
        html: string,
        filenamePrefix: string
    ): Promise<GeneratedReport> {
        const browser = await puppeteer.launch({
            headless: 'shell',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: 'networkidle0' });

        const buffer = await page.pdf({
            format: 'A4',
            printBackground: true
        });

        await browser.close();

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `${filenamePrefix}-${timestamp}.pdf`;

        return {
            buffer: Buffer.from(buffer),
            filename,
            mimeType: 'application/pdf'
        };
    }

    async generateExcelFromRows(
        sheetName: string,
        columns: Array<{ header: string; key: string; width?: number }>,
        rows: Record<string, unknown>[],
        filenamePrefix: string
    ): Promise<GeneratedReport> {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet(sheetName);

        worksheet.columns = columns;

        rows.forEach(row => {
            worksheet.addRow(row);
        });

        const buffer = await workbook.xlsx.writeBuffer();

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `${filenamePrefix}-${timestamp}.xlsx`;

        return {
            buffer: Buffer.from(buffer),
            filename,
            mimeType:
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        };
    }
}
