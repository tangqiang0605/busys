import { accessTokenKey } from "./user";
import { Response } from "./types";

export interface Route {
  route_id: number,
  route_name: string,
  // location: string,
  created_at?: string,
  updated_at?: string,
}

export interface RouteDetail {
  detail_id: string;
  route_id: number;
  station_id: string;
  station_order: number,
  created_at?: string;
  updated_at?: string;
  route: Route;
}

/**
 * 更新路线上的车站排序
 * @param id 
 * @returns 
 */
export async function updateRouteOrders(data: Array<{ detail_id: number, station_order: number }>) {
  const accessToken = (JSON.parse(localStorage.getItem(accessTokenKey) || '{}')).data;
  const result = await fetch(`/api/routeDetail`, {
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

export async function deleteRouteDetailApi(id: string) {
  const accessToken = JSON.parse(localStorage.getItem(accessTokenKey) || '{}').data;
  const result = await fetch(`/api/routeDetail/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': "application/json",
      "Authorization": `Bearer ${accessToken}`
    }
  })
  const response = await result.json()
  // response.data.data
  return response
}

export async function getRouteDetailByRouteId(params: { route_id: string }) {
  const searchParams = new URLSearchParams(params);

  const accessToken = JSON.parse(localStorage.getItem(accessTokenKey) || '{}').data;
  const result = await fetch(`/api/routeDetail?${searchParams.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    }
  })

  const response = await result.json() as Response<{ total: number, pageNum: number, pageSize: number, data: Array<RouteDetail> }>
  if (response.data) {
    response.data!.data = response.data?.data.sort((a, b) => a['station_order'] - b['station_order'])
  }
  return response
}

// TODO 支持参数
export async function getAllRoute(params: any) {
  const accessToken = JSON.parse(localStorage.getItem(accessTokenKey) || '{}').data;
  const result = await fetch(`/api/route`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    }
  })

  const response = await result.json()

  response.data = {
    data: response.data,
    total: 4,
    pageNum: 1,
    pageSize: 4,
  }
  return response
}

export async function createRouteDetailApi(params: { route_id: number; station_id: string; station_order: number; }) {
  const accessToken = JSON.parse(localStorage.getItem(accessTokenKey) || '{}').data;

  const result = await fetch('/api/routeDetail', {
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

export async function createRouteApi(params: any) {
  const accessToken = JSON.parse(localStorage.getItem(accessTokenKey) || '{}').data;

  const result = await fetch('/api/route', {
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


export async function updateRouteApi(id: string, data: any) {
  const accessToken = (JSON.parse(localStorage.getItem(accessTokenKey) || '{}')).data;
  const result = await fetch(`/api/route/${id}`, {
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

export async function deleteRouteApi(id: string) {
  const accessToken = JSON.parse(localStorage.getItem(accessTokenKey) || '{}').data;
  const result = await fetch(`/api/route/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': "application/json",
      "Authorization": `Bearer ${accessToken}`
    }
  })
  const response = await result.json()
  return response
}