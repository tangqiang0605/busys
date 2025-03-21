import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'; // 引入 UTC 插件

dayjs.extend(utc);

/**
 * 08:00:00 转 iso
 * 适用：选择时间（每日）然后存入数据库
 */
export function hms2iso(hms: string) {
  return dayjs.utc(`1970-01-01T${hms}`).toISOString()
  // return `1970-01-01T${hms}.000Z`
}

/**
 * 日期转ios
 */
export function ymd2iso(ymd: string) {
  return `${ymd}T00:00:00.000Z`
}

/**
 * iso 转 HH:MM:ss
 * @param str 
 * @returns 
 */
export const iso2hhmm = (str: string) => {
  const date = new Date(str);
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const timeString = `${hours}:${minutes}`;
  // return timeString

  const utcDate = dayjs.utc(str);

  // 格式化为 HH:mm:ss
  const formattedTime = utcDate.format('HH:mm:ss');

  return formattedTime;
}