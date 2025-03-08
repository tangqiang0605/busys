

export interface Response<T> {
  data?: T,
  message: string,
  path: string,
  // TODO 改为枚举
  statusCode: number,
  timestamp: string,
}



export interface Employee {
  "name": string,
  "birth_date": string,
  "gender": string,
  "address": string,
  "phone_number": string,
  "id_type": string,
  "id_number": string
}

export interface DirverInfo {
  driver_id: string,
  "license_type": string,
  "license_number": string,
  "license_expiry_date": string
}

export type DriverInfoFormData = {
  employee: Employee,
  driverInfo: Omit<DirverInfo, 'driver_id'>
}

export type DriverInfoTableData = DirverInfo & {
  employee: Employee
}