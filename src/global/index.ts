import { App } from 'vue'
import registerElement from './register-element'
export function globalRegister(app: App) {
  // 两种都可以
  // registerElement(app)
  app.use(registerElement)
}
