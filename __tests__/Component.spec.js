import { test, expect } from "@jest/globals"
import { mount } from "@vue/test-utils"
import { VueMdi, library } from "../src"

const mdiTestIcon = "M 10 10 H 90 V 90 H 10 L 10 10"
const wrapperVueMdi = {
  components: { VueMdi },
  props: VueMdi.props,
  template: `<VueMdi v-bind="$props" />`,
}

test("VueMdi component", () => {
  library.add({ mdiTestIcon })

  const wrapper = mount(wrapperVueMdi, {
    propsData: {
      icon: "test-icon",
    },
  })

  //  Checking for the existence of an svg tag
  expect(wrapper.html()).toContain("svg")

  //  Cheking for rendering path element
  const path = wrapper.find("path")

  expect(path.attributes("d")).toBe(mdiTestIcon)
})

//  TODO: Need more tests
