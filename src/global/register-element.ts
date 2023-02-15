import { App } from 'vue'
import {
  ElButton,
  ElAvatar,
  ElRow,
  ElCalendar,
  ElTabPane,
  ElTabs,
  ElIcon,
  ElForm,
  ElInput,
  ElFormItem,
  ElCheckbox,
  ElLink
} from 'element-plus'

const components = [
  ElButton,
  ElAvatar,
  ElRow,
  ElCalendar,
  ElTabPane,
  ElTabs,
  ElIcon,
  ElForm,
  ElInput,
  ElFormItem,
  ElCheckbox,
  ElLink
]
export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
