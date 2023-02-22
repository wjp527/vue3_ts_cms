import { App } from 'vue'
// 局部导入组件
import registerElement from './register-element'
// 方法
import registerProperties from './register-properties'
export function globalRegister(app: App) {
  // 两种都可以
  // registerElement(app)
  app.use(registerElement)
  app.use(registerProperties)
}
