// 将路由转换为选项
export const generateRouteActions = (menuData) => {
  return menuData.flatMap((item) => {
    return item.routes.map((route) => ({
      label: route.name,
      value: `/${item.path}/${route.path}`,
    }));
  });
};