import { Response } from '../apis/types';

export interface CommonTalbeProps<T> {
  CreateFormItem: React.ReactNode,
  defaultForm: Partial<T>,
  tableSettings: any,
  createItemApi: (params: Partial<T>) => Promise<any>,
  getAllItemApi: (params: Record<string, string>) => Promise<Response<{ total: number; pageNum: number; pageSize: number; data: Array<T> }>>,
  keyName: keyof T;
}