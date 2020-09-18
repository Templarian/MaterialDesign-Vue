import { describe, beforeEach, it, expect } from "@jest/globals"
import { mount } from "@vue/test-utils"
import { VueMdi, library } from "../src"

const mdiTestIcon = "M 10 10 H 90 V 90 H 10 L 10 10"
const wrapperVueMdi = {
  components: { VueMdi },
  props: VueMdi.props,
  template: `<VueMdi v-bind="$props" />`,
}

describe("VueMdi component", () => {
  let wrapper

  beforeEach(() => {
    library.add({ mdiTestIcon })

    wrapper = mount(wrapperVueMdi, {
      propsData: {
        icon: "test-icon",
      },
    })
  })

  it("renders an svg with path element", () => {
    //  Checking for the existence of an svg tag
    expect(wrapper.html()).toContain("svg")

    //  Cheking for rendering path element
    const path = wrapper.find("path")

    expect(path.attributes("d")).toBe(mdiTestIcon)
  })

  it("accepts a 'title' property", async () => {
    await wrapper.setProps({ title: "foo" })

    //  Cheking for rendering of the aria-labelledby attribute
    expect(wrapper.attributes()["aria-labelledby"]).toMatch("icon_labelledby")

    //  Cheking for rendering title
    const title = wrapper.find("title")

    expect(title.text()).toEqual("foo")
  })

  it("accepts a 'description' property", async () => {
    await wrapper.setProps({ title: "foo", description: "bar" })

    //  Cheking for rendering of the aria-labelledby attribute
    expect(wrapper.attributes()["aria-labelledby"]).toMatch("icon_describedby")

    //  Cheking for rendering description
    const description = wrapper.find("desc")

    expect(description.text()).toEqual("bar")
  })

  it("accepts a 'size' property", async () => {
    await wrapper.setProps({ size: 2 })

    //  Checking the styles width and height properties of the svg element
    expect(wrapper.attributes().style).toBe("width: 3rem; height: 3rem;")
  })

  it("accepts a 'color' property", async () => {
    await wrapper.setProps({ color: "#888" })

    //  Checking the fill property of the path element
    const path = wrapper.find("path")

    expect(path.attributes().style).toBe("fill: #888;")
  })
})

//  TODO: Need more tests
