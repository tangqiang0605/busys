import { createCRUDApi } from "../common";

export interface VehicleOperation {
  operation_id: number; // 运行记录ID
  vehicle_id: number; // 车辆ID
  route_id: number; // 路线ID
  driver_id: number; // 司机ID
  created_at: string; // ISO 8601 格式的记录创建时间
  updated_at: string; // ISO 8601 格式的记录更新时间
}

export const {
  getAllItemApi: getAllVehicleOperationApi,
  createItemApi: createVehicleOperationApi,
  updateItemApi: updateVehicleOperationApi,
  deleteItemApi: deleteVehicleOperationApi,
} = createCRUDApi<VehicleOperation>('vehicleOperation');