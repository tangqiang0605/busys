// 随机生成设施数据
function generateRandomFacility() {
  const facilityTypes = [1, 2, 3, 4, 5]; // 假设有5种设施类型
  const descriptions = [
    "监控1号", "监控2号", "监控3号", "监控4号", "监控5号",
    "照明1号", "照明2号", "照明3号", "照明4号", "照明5号",
    "消防1号", "消防2号", "消防3号", "消防4号", "消防5号",
    "通信1号", "通信2号", "通信3号", "通信4号", "通信5号"
  ];
  const locations = [
    "station", "depot", "warehouse", "office", "control_room"
  ];
  const owners = ["1", "2", "3", "4", "5"]; // 假设有5个所有者

  return {
    facility_type_id: facilityTypes[Math.floor(Math.random() * facilityTypes.length)],
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
    location: locations[Math.floor(Math.random() * locations.length)],
    owner_id: owners[Math.floor(Math.random() * owners.length)]
  };
}

// 生成指定数量的设施数据
function generateFacilities(count) {
  const facilities = [];
  for (let i = 0; i < count; i++) {
    facilities.push(generateRandomFacility());
  }
  return facilities;
}

// 批量添加设施的函数
async function addFacilities(facilities) {
  const url = "http://localhost:3000/facility";
  const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjM0NTYsInVzZXJuYW1lIjoiZGVmYXVsdF91c2VybmFtZSIsIm1ldGFkYXRhIjp7ImRyaXZlcl9pZCI6IiJ9LCJpc19hY3RpdmUiOnRydWUsImlhdCI6MTc0NzczNDM1NywiZXhwIjoxNzQ3ODIwNzU3fQ.Da_uv9ae4OcXObMYcbH-Voa2c1hw2tVTdGo5xCTgBuU";

  for (const facility of facilities) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(facility),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`成功添加设施：${facility.description}`, data);
      } else {
        console.error(`添加设施失败：${facility.description}`, response.status);
      }
    } catch (error) {
      console.error(`添加设施时发生错误：${facility.description}`, error);
    }
  }
}

// 生成10个随机设施并添加到数据库
const facilities = generateFacilities(10);
addFacilities(facilities);