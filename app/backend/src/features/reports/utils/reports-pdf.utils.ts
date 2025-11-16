import { MostBoughtProductView } from '../types/reports.types';

export function buildReportsRevenueHtml(totalRevenue: number): string {
    const formattedTotal = totalRevenue.toFixed(2);
    const generatedAt = new Date().toISOString();

    return `
            <!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="UTF-8" />
                <title>Total Revenue Report</title>
                <style>
                  body {
                    font-family: Arial, sans-serif;
                    margin: 40px;
                  }
                  h1 {
                    color: #333;
                  }
                  .summary {
                    margin-top: 24px;
                    padding: 16px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    background-color: #f9f9f9;
                  }
                  .label {
                    font-weight: bold;
                  }
                </style>
              </head>
              <body>
                <h1>Total Revenue Report</h1>
                <div class="summary">
                  <p><span class="label">Total Revenue:</span> ${formattedTotal}</p>
                  <p><span class="label">Generated At:</span> ${generatedAt}</p>
                </div>
              </body>
            </html>
        `;
}

export function buildReportsMostBoughtProductsHtml(
    products: MostBoughtProductView[]
): string {
    const generatedAt = new Date().toISOString();

    const rows = products
        .map(
            (p, index) => `
            <tr>
              <td>${index + 1}</td>
              <td>${p.productName}</td>
              <td>${p.totalQuantity}</td>
              <td>${p.totalRevenue.toFixed(2)}</td>
            </tr>`
        )
        .join('');

    return `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <title>Most Bought Products Report</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 40px;
              }
              h1 {
                color: #333;
              }
              .meta {
                margin-bottom: 16px;
              }
              table {
                width: 100%;
                border-collapse: collapse;
              }
              th, td {
                border: 1px solid #ddd;
                padding: 8px;
                text-align: left;
              }
              th {
                background-color: #f2f2f2;
              }
            </style>
          </head>
          <body>
            <h1>Most Bought Products</h1>
            <div class="meta">
              <p><strong>Generated At:</strong> ${generatedAt}</p>
            </div>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Total Quantity</th>
                  <th>Total Revenue</th>
                </tr>
              </thead>
              <tbody>
                ${rows}
              </tbody>
            </table>
          </body>
        </html>
    `;
}
