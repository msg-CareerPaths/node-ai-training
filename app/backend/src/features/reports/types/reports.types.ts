export type GeneratedReport = {
    buffer: Buffer;
    filename: string;
    mimeType: string;
};

export type ExcelColumnDefinition = {
    header: string;
    key: string;
    width?: number;
};

export type ExcelRow = Record<string, unknown>;

export type ExcelSheetDefinition = {
    sheetName: string;
    columns: ExcelColumnDefinition[];
    rows: ExcelRow[];
};

export type MostBoughtProductView = {
    productName: string;
    totalQuantity: number;
    totalRevenue: number;
};
