const definitions = {};
let id = 0;

function camelize(str) {
  const arr = str.split("-");
  const capital = arr.map((item, index) =>
    index
      ? item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
      : item.toLowerCase()
  );

  return capital.join("")
}

const getIcon = (iconName) => {
  const iconCamelName = camelize("mdi-" + iconName);

  if (Object.prototype.hasOwnProperty.call(definitions, iconCamelName)) {
    const iconDefinition = definitions[iconCamelName];

    id++;

    return {
      id,
      path: iconDefinition,
    }
  }

  return false
};

const library = {
  add(icons) {
    for (const [icon, path] of Object.entries(icons)) {
      definitions[icon] = path;
    }
  },
  reset() {
    for (const icon of Object.getOwnPropertyNames(definitions)) {
      delete definitions[icon];
    }
  },
};

const removeMdiPrefix = (str) => str.replace("mdi-", "");

var VueMdi = {
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
  render(createElement, { props, _v }) {
    const iconName = removeMdiPrefix(props.icon);
    const icon = getIcon(iconName);

    if (icon) {
      const pathStyle = {};
      const transform = [];
      const style = {};

      if (props.size) {
        style.width = `${props.size * 1.5}rem`;
        style.height = style.width;
      }

      if (props.horizontal) {
        transform.push("scaleX(-1)");
      }

      if (props.vertical) {
        transform.push("scaleY(-1)");
      }

      if (props.rotate !== 0) {
        transform.push(`rotate(${props.rotate}deg)`);
      }

      if (props.color !== null) {
        pathStyle.fill = props.color;
      }

      const pathElement = createElement("path", {
        attrs: {
          d: icon.path,
        },
        style: pathStyle,
      });

      if (transform.length > 0) {
        style.transform = transform.join(" ");
        style.transformOrigin = "center";
      }

      let spinElement = pathElement;
      const spinSec = typeof props.spin !== "number" ? 2 : props.spin;
      let inverse = props.horizontal || props.vertical;

      if (spinSec < 0) {
        inverse = !inverse;
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
        );
      }

      let ariaLabelledby;
      const labelledById = `icon_labelledby_${icon.id}`;
      const describedById = `icon_describedby_${icon.id}`;
      let role;

      if (props.title) {
        ariaLabelledby = props.description
          ? `${labelledById} ${describedById}`
          : labelledById;
      } else {
        role = "img";

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
                  _v(props.title)
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
                  _v(props.description)
                ),
              ]
            : []),
          spinElement,
        ]
      )
    }

    return null
  },
};

var index = { VueMdi, library };

export default index;
