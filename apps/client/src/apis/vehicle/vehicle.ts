import { accessTokenKey } from "../login";
import { Response } from "../types";

export interface Vehicle {
  vehicle_id: number;
  license_plate: string;
  vehicle_type: string;
  capacity: number;
  purchase_date: string;
  status: string;
  vehicle_name: string;
  price: number;
  manufacturer: string;
  model: string;
  image_url?: string;
  // vehicleOperations: VehicleOperation[];
  // vehicleMaintenance: VehicleMaintenance[];
  created_at: string;
  updated_at: string;
  // FareBills: FareBills[];
}

export async function getAllVehicleApi(params: Record<string, string>) {
  const searchParams = new URLSearchParams(params);
  const accessToken = JSON.parse(localStorage.getItem(accessTokenKey) || '{}').data;
  const result = await fetch(`/api/vehicle?${searchParams.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    }
  })

  const response = await result.json() as Response<{ total: number, pageNum: number, pageSize: number, data: Array<Vehicle> }>
  return response
}

export async function createVehicleApi(params: Partial<Vehicle>) {
  const accessToken = JSON.parse(localStorage.getItem(accessTokenKey) || '{}').data;

  const result = await fetch('/api/vehicle', {
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


export async function updateVehicleApi(id: string, data: Partial<Vehicle>) {
  const accessToken = (JSON.parse(localStorage.getItem(accessTokenKey) || '{}')).data;
  const result = await fetch(`/api/vehicle/${id}`, {
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

export async function deleteVehicleApi(id: string) {
  const accessToken = JSON.parse(localStorage.getItem(accessTokenKey) || '{}').data;
  const result = await fetch(`/api/vehicle/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': "application/json",
      "Authorization": `Bearer ${accessToken}`
    }
  })
  const response = await result.json()
  return response
}