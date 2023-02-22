import { App } from 'vue'

// 格式化时间
import { formatUtcString } from '@/utils/date-format'
export default function registerProperties(app: App) {
  // 在app上配置方法
  app.config.globalProperties.$filters = {
    formatTime(value: string) {
      return formatUtcString(value)
    }
  }
}
