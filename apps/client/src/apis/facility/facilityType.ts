import { accessTokenKey } from "../user";
import { Response } from "../types";

export interface FacilityTypes {
  type_id: number;
  type_name: string;
  type_description?: string;
  image_url?: string;
  price: number;
}

export async function getAllFacilityTypesApi(params: Record<string, string>) {
  const searchParams = new URLSearchParams(params);
  const accessToken = JSON.parse(localStorage.getItem(accessTokenKey) || '{}').data;
  const result = await fetch(`/api/facilityTypes?${searchParams.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    }
  })

  const response = await result.json() as Response<{ total: number, pageNum: number, pageSize: number, data: Array<FacilityTypes> }>
  return response
}

export async function createFacilityTypesApi(params: Partial<FacilityTypes>) {
  const accessToken = JSON.parse(localStorage.getItem(accessTokenKey) || '{}').data;

  const result = await fetch('/api/facilityTypes', {
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


export async function updateFacilityTypesApi(id: string, data: Partial<FacilityTypes>) {
  const accessToken = (JSON.parse(localStorage.getItem(accessTokenKey) || '{}')).data;
  const result = await fetch(`/api/facilityTypes/${id}`, {
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

export async function deleteFacilityTypesApi(id: string) {
  const accessToken = JSON.parse(localStorage.getItem(accessTokenKey) || '{}').data;
  const result = await fetch(`/api/facilityTypes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': "application/json",
      "Authorization": `Bearer ${accessToken}`
    }
  })
  const response = await result.json()
  return response
}