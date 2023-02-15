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
  ElLink,
  ElHeader,
  ElAside,
  ElMain,
  ElContainer,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElSubMenu
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
  ElLink,
  ElHeader,
  ElAside,
  ElMain,
  ElContainer,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElSubMenu
]
export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
