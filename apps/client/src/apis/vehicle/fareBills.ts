import { createCRUDApi } from "../common";

export interface Bills {
  bill_id: number; // 账单 ID
  bill_type: string; // 账单类型（如车费、维修费）
  amount: number; // 账单金额
  created_at: string; // ISO 8601 格式的创建时间
  description?: string; // 账单描述，可选
}

export interface FareBills {
  fare_bill_id: number; // 车费账单 ID
  bill_id: number; // 账单 ID
  vehicle_id: number; // 公交车 ID
  fare_type: string; // 票价类型（如普通票价、学生票）
  route_id: number; // 路线 ID
  bill: Bills; // 关联的账单
  created_at: string; // ISO 8601 格式的记录创建时间
  updated_at: string; // ISO 8601 格式的记录更新时间
}

export const {
  getAllItemApi: getAllFareBillsApi,
  createItemApi: createFareBillApi,
  updateItemApi: updateFareBillApi,
  deleteItemApi: deleteFareBillApi,
} = createCRUDApi<FareBills>('fareBills');