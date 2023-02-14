import { App } from 'vue'
import { ElButton, ElAvatar, ElRow } from 'element-plus'

const components = [ElButton, ElAvatar, ElRow]
export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
