import { accessTokenKey } from "../user";
import { Response } from "../types";

export interface FixedSchedule {
  schedule_id: number,
  description: string;
  weekly_schedule: Array<{ routeIds: number[] }>,
  createdAt: string;
  updatedAt: string;
}

export async function getAllFixedScheduleApi(params: Record<string, string>) {
  const searchParams = new URLSearchParams(params);
  const accessToken = JSON.parse(localStorage.getItem(accessTokenKey) || '{}').data;
  const result = await fetch(`/api/fixedSchedule?${searchParams.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    }
  })

  const response = await result.json() as Response<{ total: number, pageNum: number, pageSize: number, data: Array<FixedSchedule> }>
  return response
}

export async function createFixedScheduleApi(params: Partial<FixedSchedule>) {
  const accessToken = JSON.parse(localStorage.getItem(accessTokenKey) || '{}').data;

  const result = await fetch('/api/fixedSchedule', {
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


export async function updateFixedScheduleApi(id: string, data: Partial<FixedSchedule>) {
  const accessToken = (JSON.parse(localStorage.getItem(accessTokenKey) || '{}')).data;
  const result = await fetch(`/api/fixedSchedule/${id}`, {
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

export async function deleteFixedScheduleApi(id: string) {
  const accessToken = JSON.parse(localStorage.getItem(accessTokenKey) || '{}').data;
  const result = await fetch(`/api/fixedSchedule/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': "application/json",
      "Authorization": `Bearer ${accessToken}`
    }
  })
  const response = await result.json()
  return response
}