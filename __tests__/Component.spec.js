import { describe, beforeEach, it, expect } from "@jest/globals"
import { mount } from "@vue/test-utils"
import { mdiAccount } from "@mdi/js"
import { mdilAccount } from "@mdi/light-js"
import { VueMdi, library } from "../src"

const wrapperVueMdi = {
  components: { VueMdi },
  props: VueMdi.props,
  template: `<VueMdi v-bind="$props" />`,
}

describe("VueMdi component", () => {
  let wrapper

  beforeEach(() => {
    library.add({ mdiAccount, mdilAccount })

    wrapper = mount(wrapperVueMdi, {
      propsData: {
        icon: ["mdil", "account"],
      },
    })
  })

  it("renders an svg with path element", async () => {
    //  Checking for the existence of an svg tag
    expect(wrapper.html()).toContain("svg")

    //  Cheking for rendering path element
    const path = wrapper.find("path")

    expect(path.attributes("d")).toBe(mdilAccount)

    //  Checking another icon
    await wrapper.setProps({ icon: { prefix: "mdi", name: "mdi-account" } })

    expect(path.attributes("d")).toBe(mdiAccount)
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

    //  Checking the icon name as a class of <i> element
    await wrapper.setProps({ size: "mdi-36px" })

    expect(wrapper.attributes().style).toBe("width: 2.25rem; height: 2.25rem;")
  })

  it("accepts a 'color' property", async () => {
    await wrapper.setProps({ color: "#888" })

    //  Checking the fill property of the path element
    const path = wrapper.find("path")

    expect(path.attributes().style).toBe("fill: #888;")
  })

  it("accepts a 'spin' property", async () => {
    await wrapper.setProps({ spin: true })

    //  Checking the style animation property
    const g = wrapper.find("g")

    expect(g.attributes().style).toBe(
      "animation: spin linear 2s infinite; transform-origin: center;"
    )
  })
})

//  TODO: Need more tests
