import { accessTokenKey } from "../user";
import { Response } from "../types";

export interface StationSurveillance {
  surveillance_id: number;
  facility_id: number;
  station_id: number;
  timestamp: string;
  passenger_count: number;
  created_at: string;
  updated_at: string;
}

export async function getAllStationSurveillanceApi(params: Record<string, string>) {
  const searchParams = new URLSearchParams(params);
  const accessToken = JSON.parse(localStorage.getItem(accessTokenKey) || '{}').data;
  const result = await fetch(`/api/stationSurveillance?${searchParams.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    }
  })

  const response = await result.json() as Response<{ total: number, pageNum: number, pageSize: number, data: Array<StationSurveillance> }>
  return response
}

export async function createStationSurveillanceApi(params: Partial<StationSurveillance>) {
  const accessToken = JSON.parse(localStorage.getItem(accessTokenKey) || '{}').data;

  const result = await fetch('/api/stationSurveillance', {
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


export async function updateStationSurveillanceApi(id: string, data: Partial<StationSurveillance>) {
  const accessToken = (JSON.parse(localStorage.getItem(accessTokenKey) || '{}')).data;
  const result = await fetch(`/api/stationSurveillance/${id}`, {
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

export async function deleteStationSurveillanceApi(id: string) {
  const accessToken = JSON.parse(localStorage.getItem(accessTokenKey) || '{}').data;
  const result = await fetch(`/api/stationSurveillance/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': "application/json",
      "Authorization": `Bearer ${accessToken}`
    }
  })
  const response = await result.json()
  return response
}