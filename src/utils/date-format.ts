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
  return dayjs.utc(utcString).format(fortmat)
}

// 格式化日期 (时间戳格式)
export function formatUtcStamp(
  utcString: string,
  fortmat: string = DATE_TIME_FORMAT
) {
  return dayjs().format(fortmat)
}
