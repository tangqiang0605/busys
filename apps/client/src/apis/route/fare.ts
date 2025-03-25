import { createCRUDApi } from "../common";

export interface Fare {
  fare_id: number; // 票价 ID
  route_id: number; // 路线 ID
  fare_type: string; // 票价类型（如普通票价、学生票）
  price: number; // 票价金额
  start_date?: string; // ISO 8601 格式的适用开始日期，可选
  end_date?: string; // ISO 8601 格式的适用结束日期，可选
  description?: string; // 票价描述，可选
  created_at: string; // ISO 8601 格式的记录创建时间
  updated_at: string; // ISO 8601 格式的记录更新时间
}

export const {
  getAllItemApi: getAllFareApi,
  createItemApi: createFareApi,
  updateItemApi: updateFareApi,
  deleteItemApi: deleteFareApi,
} = createCRUDApi<Fare>('fare');