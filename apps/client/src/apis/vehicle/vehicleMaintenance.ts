import { createCRUDApi } from "../common";

export interface VehicleMaintenance {
  maintenance_id: number; // 维护记录ID
  vehicle_id: number; // 车辆ID
  request_id: number; // 维护申请ID
  staff_id: number; // 技术员ID
  description: string; // 维护描述
  start_date: string; // ISO 8601 格式的维护开始日期
  end_date: string; // ISO 8601 格式的维护结束日期
  created_at: string; // ISO 8601 格式的记录创建时间
  updated_at: string; // ISO 8601 格式的记录更新时间
}

export const {
  getAllItemApi: getAllVehicleMaintenanceApi,
  createItemApi: createVehicleMaintenanceApi,
  updateItemApi: updateVehicleMaintenanceApi,
  deleteItemApi: deleteVehicleMaintenanceApi,
} = createCRUDApi<VehicleMaintenance>('vehicleMaintenance');