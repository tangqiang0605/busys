export function buildWhere(restParams: any, operator: 'AND' | 'OR' = 'AND') {
  const conditions = [];
  for (const [key, value] of Object.entries(restParams)) {
    if (value !== undefined) {
      // 如果字段是 employee 的字段，嵌套查询
      if (key.startsWith('employee.')) {
        const employeeField = key.split('.')[1]; // 提取 employee 的字段名
        conditions.push({
          employee: {
            [employeeField]: { contains: value },
          },
        });
      } else {
        // 否则，直接查询 DriverInfo 的字段
        conditions.push({ [key]: { contains: value } });
      }
    }
  }

  return operator === 'AND' ? { AND: conditions } : { OR: conditions };
}

// TODO djr 支持时间范围查找
export function buildPageQuery(
  params: any,
  exactKeys: string[] = [],
  additionConditions: any[] = [],
) {
  const { pageNum = 1, pageSize = 10, ...restParams } = params;
  const skip = (Number(pageNum) - 1) * Number(pageSize);

  // 构建 where 条件
  const conditions = [];
  for (const [key, value] of Object.entries(restParams)) {
    if (value !== undefined) {
      if (exactKeys.includes(key)) {
        // id，精确搜索
        conditions.push({ [key]: Number(value) });
      } else {
        // 模糊搜索
        conditions.push({ [key]: { contains: value } });
      }
    }
  }
  const where = { AND: [...conditions, ...additionConditions] };

  return {
    skip,
    take: Number(pageSize),
    where,
    pageNum,
  };
}
