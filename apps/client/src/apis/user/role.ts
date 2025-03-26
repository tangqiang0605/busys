import { createCRUDApi } from "../common";

export interface Role {
  role_id: number; // 角色ID
  role_name: string; // 角色名称
  allowed_routes: string[]; // 允许访问的路由（JSON数组）
  allowed_actions: string[]; // 允许执行的操作（JSON数组）
  created_at: string; // ISO 8601 格式的记录创建时间
  updated_at: string; // ISO 8601 格式的记录更新时间
}

export const {
  getAllItemApi: getAllRolesApi,
  createItemApi: createRoleApi,
  updateItemApi: updateRoleApi,
  deleteItemApi: deleteRoleApi,
} = createCRUDApi<Role>('role');