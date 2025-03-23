import { accessTokenKey } from "./login";
import { Response } from "./types";

export function createCRUDApi<T>(item: string) {

  async function getAllItemApi(params: Record<string, string>) {
    const searchParams = new URLSearchParams(params);
    const accessToken = JSON.parse(localStorage.getItem(accessTokenKey) || '{}').data;
    const result = await fetch(`/api/${item}?${searchParams.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      }
    })

    const response = await result.json() as Response<{ total: number, pageNum: number, pageSize: number, data: Array<T> }>
    return response
  }

  async function createItemApi(params: Partial<T>) {
    const accessToken = JSON.parse(localStorage.getItem(accessTokenKey) || '{}').data;

    const result = await fetch('/api/${item}', {
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


  async function updateItemApi(id: string, data: Partial<T>) {
    const accessToken = (JSON.parse(localStorage.getItem(accessTokenKey) || '{}')).data;
    const result = await fetch(`/api/${item}/${id}`, {
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

  async function deleteItemApi(id: string) {
    const accessToken = JSON.parse(localStorage.getItem(accessTokenKey) || '{}').data;
    const result = await fetch(`/api/${item}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': "application/json",
        "Authorization": `Bearer ${accessToken}`
      }
    })
    const response = await result.json()
    return response

  }
  return { getAllItemApi, createItemApi, updateItemApi, deleteItemApi }
}
