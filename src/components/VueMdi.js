import { getIcon } from "../library"

const normalizeIconArgs = (icon) => {
  if (typeof icon === "object" && icon.prefix && icon.name) {
    return icon
  }

  if (Array.isArray(icon) && icon.length === 2) {
    return { prefix: icon[0], name: icon[1] }
  }

  if (typeof icon === "string") {
    return { prefix: "mdi", name: icon }
  }

  return null
}

export default {
  name: "VueMdi",
  functional: true,
  props: {
    icon: {
      type: [Object, Array, String],
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
      validator: (value) => value > 0,
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
    const {
      icon: iconArgs,
      title,
      description,
      size,
      horizontal,
      vertical,
      rotate,
      color,
      spin,
    } = props
    const icon = normalizeIconArgs(iconArgs)

    if (icon === null) {
      throw new Error("Invalid 'icon' property")
    }

    const renderedIcon = getIcon(icon)

    if (renderedIcon) {
      const pathStyle = {}
      const transform = []
      const style = {}

      if (size) {
        style.width = `${size * 1.5}rem`
        style.height = `${size * 1.5}rem`
      }

      if (horizontal) {
        transform.push("scaleX(-1)")
      }

      if (vertical) {
        transform.push("scaleY(-1)")
      }

      if (rotate !== 0) {
        transform.push(`rotate(${rotate}deg)`)
      }

      pathStyle.fill = color

      const pathElement = createElement("path", {
        attrs: {
          d: renderedIcon.path,
        },
        style: pathStyle,
      })

      if (transform.length > 0) {
        style.transform = transform.join(" ")
        style.transformOrigin = "center"
      }

      let spinElement = pathElement
      const spinSec = typeof spin !== "number" ? 2 : spin
      let inverse = horizontal || vertical

      if (spinSec < 0) {
        inverse = !inverse
      }

      if (spin) {
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
            ...(!(horizontal || vertical || rotate !== 0)
              ? [
                  createElement("rect", {
                    attrs: {
                      width: 24,
                      height: 24,
                      fill: "transparent",
                    },
                  }),
                ]
              : []),
          ]
        )
      }

      let ariaLabelledby
      const labelledById = `icon_labelledby_${renderedIcon.id}`
      const describedById = `icon_describedby_${renderedIcon.id}`
      let role

      if (title) {
        ariaLabelledby = description
          ? `${labelledById} ${describedById}`
          : labelledById
      } else {
        role = "img"

        if (description) {
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
          ...(title
            ? [
                createElement(
                  "title",
                  {
                    attrs: {
                      id: labelledById,
                    },
                  },
                  title
                ),
              ]
            : []),
          ...(description
            ? [
                createElement(
                  "desc",
                  {
                    attrs: {
                      id: describedById,
                    },
                  },
                  description
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
