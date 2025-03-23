import { accessTokenKey } from "../login";
import { Response } from "../types";

export interface JobList {
  job_id: number;
  job_title: string;
  job_description?: string;
  salary: number;
  created_at: string; // ISO 8601 格式的日期时间字符串
  updated_at: string; // ISO 8601 格式的日期时间字符串
}

export async function getAllJobListApi(params: Record<string, string>) {
  const searchParams = new URLSearchParams(params);
  const accessToken = JSON.parse(localStorage.getItem(accessTokenKey) || '{}').data;
  const result = await fetch(`/api/jobList?${searchParams.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    }
  })

  const response = await result.json() as Response<{ total: number, pageNum: number, pageSize: number, data: Array<JobList> }>
  return response
}

export async function createJobListApi(params: Partial<JobList>) {
  const accessToken = JSON.parse(localStorage.getItem(accessTokenKey) || '{}').data;

  const result = await fetch('/api/jobList', {
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


export async function updateJobListApi(id: string, data: Partial<JobList>) {
  const accessToken = (JSON.parse(localStorage.getItem(accessTokenKey) || '{}')).data;
  const result = await fetch(`/api/jobList/${id}`, {
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

export async function deleteJobListApi(id: string) {
  const accessToken = JSON.parse(localStorage.getItem(accessTokenKey) || '{}').data;
  const result = await fetch(`/api/jobList/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': "application/json",
      "Authorization": `Bearer ${accessToken}`
    }
  })
  const response = await result.json()
  return response
}