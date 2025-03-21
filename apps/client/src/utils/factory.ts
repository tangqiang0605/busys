import { Response } from "../apis/types";

// TODO 完善类型注释
export const getDataFnFactory = <T>(navigate: any, fn: (query: any & { pageNum?: number, pageSize?: number }) => Promise<Response<{ total: number, pageNum: number, pageSize: number, data: any[] }>>, keyName: string, preHandle: any = (restParams: any) => restParams) => {
  return async (params: any & { current: number, pageSize: number }, sort: any, filter: any) => {

    // 请求过程请通过抓包获取
    //  TODO 当列出于筛选或者排序的时候，也应该进行处理
    // https://ant-design.antgroup.com/components/table-cn#table-demo-head 筛选与排序
    const { current = 1, pageSize = 10, ...restParams } = params;
    const query = {
      pageNum: current,
      pageSize,
      ...preHandle(restParams)
    }
    const result = await fn(query)
    if (result.statusCode === 401) {
      navigate('/login')
      return { data: [] }
    }
    // TODO 把这段转到driver那里
    const data = result?.data?.data?.map(item => ({ ...item, key: item[keyName] }))
    return {
      data: data as T,
      // success 请返回 true，
      // 不然 table 会停止解析数据，即使有数据
      success: true,
      // 不传会使用 data 的长度，如果是分页一定要传
      total: result?.data?.total,
    };
  }
}