import { DriverInfoTableData, Response } from "./types";
import { accessTokenKey } from "./login";

export async function updateDriverInfoApi(id: string, data: any) {

  const accessToken = (JSON.parse(localStorage.getItem(accessTokenKey) || '{}')).data;

  // TODO id不存在处理，应该业务层处理？
  // TODO 请求与store结合？
  const result = await fetch(`/api/driver/${id}`, {
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

export async function deleteDriverApi(id: string) {
  const accessToken = JSON.parse(localStorage.getItem(accessTokenKey) || '{}').data;
  const result = await fetch(`/api/driver/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': "application/json",
      "Authorization": `Bearer ${accessToken}`
    }
  })
  const response = await result.json()
  return response

}

export async function getAllDriverApi(params: any) {

  const searchParams = new URLSearchParams(params);

  const accessToken = JSON.parse(localStorage.getItem(accessTokenKey) || '{}').data;
  const result = await fetch(`/api/driver/getAll?${searchParams.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    }
  })

  const response = await result.json() as Response<{ total: number, pageNum: number, pageSize: number, data: Array<DriverInfoTableData> }>
  return response
}

export async function createDriverApi(params: any) {

  const accessToken = JSON.parse(localStorage.getItem(accessTokenKey) || '{}').data;

  const result = await fetch('/api/driver/create_driver_and_employee', {
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