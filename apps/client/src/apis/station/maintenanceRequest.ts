import { createCRUDApi } from "../common";
import { accessTokenKey } from "../login";
import { Response } from "../types";

export enum RequestType {
  timer = '定期维护',
  special = '上报检修',
}

export enum MaintenanceType {
  station = 'station',
  vehicle = 'vehicle',
  facility = 'facilities',
}

export const MaintenanceTypeMapper = {
  [MaintenanceType.station]: "车站",
  [MaintenanceType.vehicle]: "车辆",
  [MaintenanceType.facility]: "设施"
}

export enum ApprovalStatus {
  approval = '审批中',
  allowed = '审批通过',
  rejected = '审批拒绝',
}

export interface MaintenanceRequest {
  request_id: number;
  request_date: string; // ISO 8601 格式的日期时间字符串
  request_description: string;
  request_type: RequestType;
  maintenance_type: MaintenanceType;
  maintenance_id: string;
  approval_status: ApprovalStatus;
  created_at: string; // ISO 8601 格式的日期时间字符串
  updated_at: string; // ISO 8601 格式的日期时间字符串
}

export const {
  getAllItemApi: getAllMaintenanceRequestsApi,
  createItemApi: createMaintenanceRequestApi,
  updateItemApi: updateMaintenanceRequestApi,
  deleteItemApi: deleteMaintenanceRequestApi,
} = createCRUDApi<MaintenanceRequest>('maintenanceRequest');

export async function getAllMaintenance4StationFacilityRequestApi(params: Record<string, string>) {
  const searchParams = new URLSearchParams(params);
  const accessToken = JSON.parse(localStorage.getItem(accessTokenKey) || '{}').data;
  const result = await fetch(`/api/maintenanceRequest/station?${searchParams.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    }
  })

  const response = await result.json() as Response<{ total: number, pageNum: number, pageSize: number, data: Array<MaintenanceRequest> }>
  return response
}
export async function getAllMaintenance4VehicleFacilityRequestApi(params: Record<string, string>) {
  const searchParams = new URLSearchParams(params);
  const accessToken = JSON.parse(localStorage.getItem(accessTokenKey) || '{}').data;
  const result = await fetch(`/api/maintenanceRequest/vehicle?${searchParams.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    }
  })

  const response = await result.json() as Response<{ total: number, pageNum: number, pageSize: number, data: Array<MaintenanceRequest> }>
  return response
}