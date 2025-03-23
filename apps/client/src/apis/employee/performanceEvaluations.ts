import { createCRUDApi } from "../common";

export interface PerformanceEvaluations {
  evaluation_id: number;
  employee_id: number;
  evaluation_date: string; // ISO 8601 格式的日期字符串
  metrics: Record<string, any>; // 评估指标（JSON 格式）
  total_score: number; // 总评分
  created_at: string; // ISO 8601 格式的日期时间字符串
  updated_at: string; // ISO 8601 格式的日期时间字符串
}

export const {
  getAllItemApi: getAllPerformanceEvaluationsApi,
  createItemApi: createPerformanceEvaluationsApi,
  updateItemApi: updatePerformanceEvaluationsApi,
  deleteItemApi: deletePerformanceEvaluationsApi,
} = createCRUDApi<PerformanceEvaluations>('performanceEvaluations');