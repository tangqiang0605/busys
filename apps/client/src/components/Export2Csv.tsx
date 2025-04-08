import { Parser } from 'json2csv';
import { Workbook, Worksheet } from 'exceljs';
import { writeFileSync } from 'fs';

// JSON 数据
const jsonData = {
  "data": [
    {
      "station_id": 1,
      "station_name": "井头圩",
      "location": "110,120",
      "created_at": "2025-03-15T03:05:08.927Z",
      "updated_at": "2025-03-15T03:05:08.927Z"
    },
    {
      "station_id": 2,
      "station_name": "安华",
      "location": "110,120",
      "created_at": "2025-03-15T03:05:19.669Z",
      "updated_at": "2025-03-15T03:05:19.669Z"
    },
    {
      "station_id": 3,
      "station_name": "矮岭",
      "location": "110,120",
      "created_at": "2025-03-15T03:05:35.054Z",
      "updated_at": "2025-03-15T03:05:35.054Z"
    },
    {
      "station_id": 4,
      "station_name": "霭雯农庄",
      "location": "110,120",
      "created_at": "2025-03-15T03:05:48.607Z",
      "updated_at": "2025-03-15T03:05:48.607Z"
    },
    {
      "station_id": 5,
      "station_name": "鳌围村",
      "location": "110,120",
      "created_at": "2025-03-15T03:05:51.997Z",
      "updated_at": "2025-03-15T03:05:51.997Z"
    },
    {
      "station_id": 6,
      "station_name": "车站1",
      "location": "123,124",
      "created_at": "2025-03-15T04:46:58.135Z",
      "updated_at": "2025-03-15T04:46:58.135Z"
    }
  ],
  "total": 6,
  "pageNum": "1",
  "pageSize": 20
};

// 导出为 CSV
async function exportToCSV(data: any[], fileName: string): Promise<string> {
  try {
    const parser = new Parser();
    const csv = parser.parse(data);
    writeFileSync(`${fileName}.csv`, csv);
    // console.log(`CSV 文件已导出到 ${fileName}.csv`);
    return fileName;
  } catch (error) {
    return error as string;
    // console.error('导出 CSV 时出错:', error);
  }
}

// 导出为 Excel
function exportToExcel(data: any[], fileName: string): void {
  try {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

    // 添加表头
    const headers = Object.keys(data[0]);
    worksheet.addRow(headers);

    // 添加数据行
    data.forEach((item) => {
      const row = headers.map((header) => item[header]);
      worksheet.addRow(row);
    });

    // 保存文件
    workbook.xlsx.writeFile(`${fileName}.xlsx`)
      .then(() => {
        console.log(`Excel 文件已导出到 ${fileName}.xlsx`);
      })
      .catch((error) => {
        console.error('导出 Excel 时出错:', error);
      });
  } catch (error) {
    console.error('导出 Excel 时出错:', error);
  }
}

// 调用导出函数
const dataToExport = jsonData.data; // 获取 JSON 数据中的数据部分
const fileName = 'stations';

exportToCSV(dataToExport, fileName); // 导出为 CSV
exportToExcel(dataToExport, fileName); // 导出为 Excel