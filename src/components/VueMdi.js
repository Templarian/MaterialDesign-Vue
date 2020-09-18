import { getIcon } from "../library"

const removeMdiPrefix = (str) => str.replace("mdi-", "")

export default {
  name: "VueMdi",
  functional: true,
  props: {
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: [Object, String],
      default: null,
    },
    description: {
      type: [Object, String],
      default: null,
    },
    size: {
      type: [Object, Number],
      default: null,
    },
    color: {
      type: String,
      default: "#000",
    },
    horizontal: {
      type: Boolean,
      default: false,
    },
    vertical: {
      type: Boolean,
      default: false,
    },
    rotate: {
      type: Number,
      default: 0,
    },
    spin: {
      type: [Boolean, Number],
      default: false,
    },
  },
  render(createElement, { props }) {
    const iconName = removeMdiPrefix(props.icon)
    const icon = getIcon(iconName)

    if (icon) {
      const pathStyle = {}
      const transform = []
      const style = {}

      if (props.size) {
        style.width = `${props.size * 1.5}rem`
        style.height = style.width
      }

      if (props.horizontal) {
        transform.push("scaleX(-1)")
      }

      if (props.vertical) {
        transform.push("scaleY(-1)")
      }

      if (props.rotate !== 0) {
        transform.push(`rotate(${props.rotate}deg)`)
      }

      if (props.color !== null) {
        pathStyle.fill = props.color
      }

      const pathElement = createElement("path", {
        attrs: {
          d: icon.path,
        },
        style: pathStyle,
      })

      if (transform.length > 0) {
        style.transform = transform.join(" ")
        style.transformOrigin = "center"
      }

      let spinElement = pathElement
      const spinSec = typeof props.spin !== "number" ? 2 : props.spin
      let inverse = props.horizontal || props.vertical

      if (spinSec < 0) {
        inverse = !inverse
      }

      if (props.spin) {
        spinElement = createElement(
          "g",
          {
            style: {
              animation: `spin${inverse ? "-inverse" : ""} linear ${Math.abs(
                spinSec
              )}s infinite`,
              transformOrigin: "center",
            },
          },
          [
            pathElement,
            ...(!(props.horizontal || props.vertical || props.rotate !== 0)
              ? createElement("rect", {
                  attrs: {
                    width: 24,
                    height: 24,
                    fill: "transparent",
                  },
                })
              : []),
          ]
        )
      }

      let ariaLabelledby
      const labelledById = `icon_labelledby_${icon.id}`
      const describedById = `icon_describedby_${icon.id}`
      let role

      if (props.title) {
        ariaLabelledby = props.description
          ? `${labelledById} ${describedById}`
          : labelledById
      } else {
        role = "img"

        if (props.description) {
          throw new Error("title attribute required when description is set")
        }
      }

      return createElement(
        "svg",
        {
          attrs: {
            viewBox: "0 0 24 24",
            role,
            "aria-labelledby": ariaLabelledby,
          },
          class: "mdi-icon",
          style,
        },
        [
          ...(props.title
            ? [
                createElement(
                  "title",
                  {
                    attrs: {
                      id: labelledById,
                    },
                  },
                  props.title
                ),
              ]
            : []),
          ...(props.description
            ? [
                createElement(
                  "desc",
                  {
                    attrs: {
                      id: describedById,
                    },
                  },
                  props.description
                ),
              ]
            : []),
          spinElement,
        ]
      )
    }

    return null
  },
}
