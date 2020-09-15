const definitions = {
  mdi: {},
};

function camelize(str) {
  const arr = str.split("-");
  const capital = arr.map((item, index) =>
    index
      ? item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
      : item.toLowerCase()
  );

  return capital.join("")
}

function getIconFreeId() {
  let id = 0;

  for (let prefixIcons of definitions) {
    for (let icon of prefixIcons) {
      id += icon.usage;
    }
  }

  return id + 1
}

function addIcons(icons, prefix) {
  if (Object.prototype.hasOwnProperty.call(definitions, prefix)) {
    icons.forEach((icon, path) => {
      definitions[prefix][icon] = {
        path,
        usage: 0,
      };
    });
  }
}

function getIcon(icon) {
  const iconCamelName = camelize(icon.name);

  if (
    Object.prototype.hasOwnProperty.call(definitions, icon.prefix) &&
    Object.prototype.hasOwnProperty.call(
      definitions[icon.prefix],
      iconCamelName
    )
  ) {
    const iconDefinition = definitions[icon.prefix][iconCamelName];
    const iconId = getIconFreeId();

    iconDefinition.usage++;

    return {
      id: iconId,
      path: iconDefinition.path,
    }
  }

  return false
}

function normalizeIconArgs(icon) {
  if (icon === null) {
    return null
  }

  if (typeof icon === "object" && icon.prefix && icon.name) {
    return icon
  }

  if (Array.isArray(icon) && icon.length === 2) {
    return { prefix: icon[0], name: icon[1] }
  }

  if (typeof icon === "string") {
    return { prefix: "mdi", name: icon }
  }
}

var VueMdi = {
  name: "VueMdi",
  functional: true,
  props: {
    icon: {
      type: [Object, Array, String],
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
      type: Boolean,
      default: false,
    },
  },
  render(createElement, { props }) {
    const iconProp = normalizeIconArgs(props.icon);

    if (!iconProp) {
      throw new Error("Invalid icon property value")
    }

    const icon = getIcon(iconProp);

    if (icon) {
      const pathStyle = {};
      const transform = [];
      const style = {};

      if (props.size !== null) {
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
      const spinSec =
        !!props.spin || typeof props.spin !== "number" ? 2 : props.spin;
      let inverse = props.horizontal || props.vertical;

      if (spinSec < 0) {
        inverse = !inverse;
      }

      if (props.spin) {
        spinElement = createElement(
          "g",
          {
            attrs: {
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
            ? createElement(
                "title",
                {
                  attrs: {
                    id: labelledById,
                  },
                },
                props.title
              )
            : []),
          ...(props.description
            ? createElement(
                "desc",
                {
                  attrs: {
                    id: describedById,
                  },
                },
                props.description
              )
            : []),
          spinElement,
        ]
      )
    }

    return null
  },
};

const componentName = "VueMdi";
const defaultIconPrefix = "mdi";

var index = {
  install(Vue) {
    Vue.component(componentName, VueMdi);
  },
  add(icons, prefix = defaultIconPrefix) {
    addIcons(icons, prefix);
  },
};

export default index;
