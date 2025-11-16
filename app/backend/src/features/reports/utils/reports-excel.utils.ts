import {
    ExcelRow,
    ExcelSheetDefinition,
    MostBoughtProductView
} from '../types/reports.types';

export function buildRevenueExcelSheet(
    totalRevenue: number
): ExcelSheetDefinition {
    const rows: ExcelRow[] = [
        {
            metric: 'Total Revenue',
            value: totalRevenue
        },
        {
            metric: 'Generated At',
            value: new Date().toISOString()
        }
    ];

    return {
        sheetName: 'Total Revenue',
        columns: [
            { header: 'Metric', key: 'metric', width: 30 },
            { header: 'Value', key: 'value', width: 20 }
        ],
        rows
    };
}

export function buildMostBoughtProductsExcelSheet(
    products: MostBoughtProductView[]
): ExcelSheetDefinition {
    const rows: ExcelRow[] = products.map(product => ({
        productName: product.productName,
        totalQuantity: product.totalQuantity,
        totalRevenue: product.totalRevenue
    }));

    return {
        sheetName: 'Most Bought Products',
        columns: [
            { header: 'Product', key: 'productName', width: 40 },
            { header: 'Total Quantity', key: 'totalQuantity', width: 20 },
            { header: 'Total Revenue', key: 'totalRevenue', width: 20 }
        ],
        rows
    };
}
