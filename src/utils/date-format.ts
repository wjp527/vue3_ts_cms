import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
// 让dayjs可以转换utc格式
dayjs.extend(utc)
const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
// 格式化日期 (uct格式)
export function formatUtcString(
  utcString: string,
  fortmat: string = DATE_TIME_FORMAT
) {
  // 转换成东八区
  // 往后推迟8个小时
  return dayjs.utc(utcString).utcOffset(8).format(fortmat)
}

// 格式化日期 (时间戳格式)
export function formatUtcStamp(
  utcString: string,
  fortmat: string = DATE_TIME_FORMAT
) {
  return dayjs().format(fortmat)
}
