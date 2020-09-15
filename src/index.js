import VueMdi from "./components/VueMdi"
import { addIcons } from "./library"

const componentName = "VueMdi"
const defaultIconPrefix = "mdi"

export default {
  install(Vue) {
    Vue.component(componentName, VueMdi)
  },
  add(icons, prefix = defaultIconPrefix) {
    addIcons(icons, prefix)
  },
}
