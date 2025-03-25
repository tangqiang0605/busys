import { createCRUDApi } from "../common";

export interface StationMaintenance {
  maintenance_id: number; // 维护记录 ID
  station_id: number; // 车站 ID
  maintenance_date: string; // ISO 8601 格式的日期字符串
  request_id: number; // 维护申请 ID
  description: string; // 维护描述
  bill_id?: number; // 账单 ID，可选
  staff_id: number; // 职员 ID
  created_at: string; // ISO 8601 格式的日期时间字符串
  updated_at: string; // ISO 8601 格式的日期时间字符串
}

export const {
  getAllItemApi: getAllStationMaintenanceApi,
  createItemApi: createStationMaintenanceApi,
  updateItemApi: updateStationMaintenanceApi,
  deleteItemApi: deleteStationMaintenanceApi,
} = createCRUDApi<StationMaintenance>('stationMaintenance');