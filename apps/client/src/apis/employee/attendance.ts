import { createCRUDApi } from "../common";

export interface Attendance {
  attendance_id: number;
  employee_id: number;
  date: string; // ISO 8601 格式的日期字符串
  sign_in_time?: string; // ISO 8601 格式的时间字符串，可选
  sign_out_time?: string; // ISO 8601 格式的时间字符串，可选
  status: string; // 考勤状态
  created_at: string; // ISO 8601 格式的日期时间字符串
  updated_at: string; // ISO 8601 格式的日期时间字符串
}

export const {
  getAllItemApi: getAllAttendanceApi,
  createItemApi: createAttendanceApi,
  updateItemApi: updateAttendanceApi,
  deleteItemApi: deleteAttendanceApi,
} = createCRUDApi<Attendance>('attendance');