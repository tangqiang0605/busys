import { createCRUDApi } from "../common";

export interface Bills {
  bill_id: number;
  bill_type: string; // 账单类型（如车费、维修费）
  amount: number; // 账单金额
  created_at: string; // ISO 8601 格式的日期时间字符串
  description?: string; // 账单描述，可选
}

export const {
  getAllItemApi: getAllBillsApi,
  createItemApi: createBillApi,
  updateItemApi: updateBillApi,
  deleteItemApi: deleteBillApi,
} = createCRUDApi<Bills>('bills');