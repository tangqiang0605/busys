import { accessTokenKey } from "../login";
import { Response } from "../types";

export interface Employee {
  employee_id: number;
  name: string;
  birth_date: string; // ISO 8601 格式的日期时间字符串
  gender: string;
  address: string;
  phone_number: string;
  id_type: string;
  id_number: string;
  created_at: string; // ISO 8601 格式的日期时间字符串
  updated_at: string; // ISO 8601 格式的日期时间字符串
}

export async function getAllEmployeeApi(params: Record<string, string>) {
  const searchParams = new URLSearchParams(params);
  const accessToken = JSON.parse(localStorage.getItem(accessTokenKey) || '{}').data;
  const result = await fetch(`/api/employee?${searchParams.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    }
  })

  const response = await result.json() as Response<{ total: number, pageNum: number, pageSize: number, data: Array<Employee> }>
  return response
}

export async function createEmployeeApi(params: Partial<Employee>) {
  const accessToken = JSON.parse(localStorage.getItem(accessTokenKey) || '{}').data;

  const result = await fetch('/api/employee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${accessToken}`
    },
    body: JSON.stringify(params)
  })

  const response = await result.json()
  return response
}


export async function updateEmployeeApi(id: string, data: Partial<Employee>) {
  const accessToken = (JSON.parse(localStorage.getItem(accessTokenKey) || '{}')).data;
  const result = await fetch(`/api/employee/${id}`, {
    method: "PATCH",
    headers: {
      'Content-Type': "application/json",
      "Authorization": `Bearer ${accessToken}`
    },
    body: JSON.stringify(data)
  })
  const response = await result.json()
  return response;

}

export async function deleteEmployeeApi(id: string) {
  const accessToken = JSON.parse(localStorage.getItem(accessTokenKey) || '{}').data;
  const result = await fetch(`/api/employee/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': "application/json",
      "Authorization": `Bearer ${accessToken}`
    }
  })
  const response = await result.json()
  return response
}