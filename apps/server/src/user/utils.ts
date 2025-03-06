import * as crypto from 'node:crypto'
// 哈希密码的函数（带盐值）
export function hashPasswordWithSalt(password) {
  // const salt = crypto.randomBytes(16).toString('hex'); // 生成随机盐值
  const salt = "96b7239bb2db4c66dd812087a3f835ec"
  // 将密码和盐值组合
  const saltedPassword = `${salt}${password}`;
  const hash = crypto.createHash('sha256');
  hash.update(saltedPassword); // 更新哈希内容
  return hash.digest('hex'); // 返回十六进制字符串
}

// 哈希密码的函数（不带盐值）
export function hashPassword(password: string): string {
  const hash = crypto.createHash('sha256'); // 使用 SHA-256 哈希算法
  hash.update(password); // 更新哈希内容
  return hash.digest('hex'); // 返回十六进制字符串
}