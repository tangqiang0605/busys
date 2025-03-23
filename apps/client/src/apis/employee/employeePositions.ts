import { createCRUDApi } from "../common";

export interface EmployeePositions {
  position_id: number;
  employee_id: number;
  job_id: number;
  start_date: string; // ISO 8601 格式的日期字符串
  end_date?: string; // ISO 8601 格式的日期字符串，可选
  created_at: string; // ISO 8601 格式的日期时间字符串
  updated_at: string; // ISO 8601 格式的日期时间字符串
}

export const { getAllItemApi: getAllEmployeePositionsApi, createItemApi: createEmployeePositionsApi, updateItemApi: updateEmployeePositionsApi, deleteItemApi: deleteEmployeePositionsApi } = createCRUDApi<EmployeePositions>('employeePositions')
