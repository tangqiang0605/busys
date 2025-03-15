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