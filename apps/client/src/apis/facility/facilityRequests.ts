import { createCRUDApi } from "../common";
import { accessTokenKey } from "../login";

export enum OwnerType {
  Station = 'station',
  Vehicle = 'vehicle',
}

export enum ApprovalStatus {
  approval = '审批中',
  allowed = '审批通过',
  rejected = '审批拒绝',
}

export interface FacilityRequests {
  request_id: number; // 申请单 ID
  request_date: string; // ISO 8601 格式的申请日期
  facility_type_id: number; // 设施类型 ID
  request_reason: string; // 申请理由
  owner_type: OwnerType; // 设施归属类型
  owner_id: string; // 设施归属 ID
  approval_status: ApprovalStatus; // 审批状态
  created_at: string; // ISO 8601 格式的记录创建时间
  updated_at: string; // ISO 8601 格式的记录更新时间
}

export const {
  getAllItemApi: getAllFacilityRequestsApi,
  createItemApi: createFacilityRequestApi,
  updateItemApi: updateFacilityRequestApi,
  deleteItemApi: deleteFacilityRequestApi,
} = createCRUDApi<FacilityRequests>('facilityRequests');


export async function approvalFacilityRequestApi(id: string) {
  const accessToken = (JSON.parse(localStorage.getItem(accessTokenKey) || '{}')).data;
  const result = await fetch(`/api/facilityRequests/manager`, {
    method: "POST",
    headers: {
      'Content-Type': "application/json",
      "Authorization": `Bearer ${accessToken}`
    },
    body: JSON.stringify({ id, isPass: true })
  })
  const response = await result.json()
  return response;
}

export async function rejectedFacilityRequestApi(id: string) {
  const accessToken = (JSON.parse(localStorage.getItem(accessTokenKey) || '{}')).data;
  const result = await fetch(`/api/facilityRequests/manager`, {
    method: "POST",
    headers: {
      'Content-Type': "application/json",
      "Authorization": `Bearer ${accessToken}`
    },
    body: JSON.stringify({ id, isPass: false })
  })
  const response = await result.json()
  return response;
}