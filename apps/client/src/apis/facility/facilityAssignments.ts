import { createCRUDApi } from "../common";

export interface FacilityAssignments {
  assignment_id: number; // 发放记录 ID
  request_id: number; // 申请单 ID
  facility_id: number; // 设施 ID
  assignment_date: string; // ISO 8601 格式的发放日期
  created_at: string; // ISO 8601 格式的记录创建时间
  updated_at: string; // ISO 8601 格式的记录更新时间
}

export const {
  getAllItemApi: getAllFacilityAssignmentsApi,
  createItemApi: createFacilityAssignmentApi,
  updateItemApi: updateFacilityAssignmentApi,
  deleteItemApi: deleteFacilityAssignmentApi,
} = createCRUDApi<FacilityAssignments>('facilityAssignments');