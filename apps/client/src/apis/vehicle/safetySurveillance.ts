import { createCRUDApi } from "../common";

export interface SafetySurveillance {
  record_id: number; // 记录 ID
  timestamp: string; // ISO 8601 格式的日期时间字符串
  report_content: string; // 监控内容
  facility_id: number; // 设施 ID
  created_at: string; // ISO 8601 格式的日期时间字符串
  updated_at: string; // ISO 8601 格式的日期时间字符串
}

export const {
  getAllItemApi: getAllSafetySurveillanceApi,
  createItemApi: createSafetySurveillanceApi,
  updateItemApi: updateSafetySurveillanceApi,
  deleteItemApi: deleteSafetySurveillanceApi,
} = createCRUDApi<SafetySurveillance>('safetySurveillance');