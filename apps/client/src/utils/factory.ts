import { Response } from "../apis/types";

// TODO 完善类型注释
export const getDataFnFactory = <T extends any[]>(navigate: any, fn: (query: any & { pageNum?: number, pageSize?: number }) => Promise<Response<{ total: number, pageNum: number, pageSize: number, data: any[] }>>, keyName: keyof T[number], preHandle: any = (restParams: any) => restParams) => {
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

export function generateMenuData(data: any[]): any[] {
  return data.map((item) => ({
    path: `/${item.path}`, // 拼接为绝对路径
    name: item.name,
    icon: item.icon,
    routes: item.routes
      ? generateMenuData(item.routes.map((subItem: any) => ({
        ...subItem,
        path: `${item.path}/${subItem.path}`, // 拼接子路径
      })))
      : undefined,
  }));
}

type Route = {
  path: string;
  name: string;
  icon?: any;
  routes?: Route[];
};
export function filterRoutes(routes: Route[], allowedPaths: string[]): Route[] {
  return routes
    .map((route) => {
      // 如果当前路由的路径在 allowedPaths 中，保留该路由
      if (allowedPaths.includes(route.path)) {
        return route;
      }

      // 如果当前路由有子路由，递归筛选子路由
      if (route.routes) {
        const filteredSubRoutes = filterRoutes(route.routes, allowedPaths);

        // 如果子路由中有符合条件的路由，保留当前路由并更新其子路由
        if (filteredSubRoutes.length > 0) {
          return {
            ...route,
            routes: filteredSubRoutes,
          };
        }
      }

      // 如果当前路由及其子路由都不符合条件，返回 null
      return null;
    })
    .filter((route): route is Route => route !== null); // 过滤掉 null 值
}
