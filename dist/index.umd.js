(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global['vue-mdi'] = factory());
}(this, (function () { 'use strict';

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

    for (let prefixIcons of Object.values(definitions)) {
      for (let icon of Object.values(prefixIcons)) {
        id += icon.usage;
      }
    }

    return id + 1
  }

  function addIcons(icons, prefix) {
    if (Object.prototype.hasOwnProperty.call(definitions, prefix)) {
      for (const [icon, path] of Object.entries(icons)) {
        definitions[prefix][icon] = {
          path,
          usage: 0,
        };
      }
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

  const normalizeIconArgs = (icon) => {
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
  };

  const normalizeIconSize = (value) => {
    if (typeof value === "string") {
      switch (value) {
        case "mdi-18px":
          return 1.225
        case "mdi-24px":
          return 1.5
        case "mdi-36px":
          return 2.25
        case "mdi-48px":
          return 3
      }
    } else if (typeof value === "number") {
      return value * 1.5
    }

    return false
  };

  const normalizeIconRotate = (value) => {
    if (typeof value === "string") {
      switch (value) {
        case "mdi-rotate-45":
          return 45
        case "mdi-rotate-90":
          return 90
        case "mdi-rotate-135":
          return 135
        case "mdi-rotate-180":
          return 180
      }
    }

    return value
  };

  const normalizeIconFlip = (value) => {
    if (typeof value === "string") {
      switch (value) {
        case "vertical":
        case "mdi-flip-v":
          return { vertical: true, horizontal: false }
        case "horizontal":
        case "mdi-flip-h":
          return { vertical: false, horizontal: true }
      }
    }

    return { vertical: false, horizontal: false }
  };

  const normalizeIconSpin = (value) => {
    if (typeof value === "string" && value === "mdi-spin") {
      return true
    }

    return value
  };

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
        type: [Object, Number, String],
        default: null,
      },
      color: {
        type: String,
        default: "#000",
      },
      flip: {
        type: [Boolean, String],
        default: false,
      },
      rotate: {
        type: [Number, String],
        default: 0,
      },
      spin: {
        type: [Boolean, Number, String],
        default: false,
      },
    },
    render(createElement, { props, _v }) {
      const iconProp = normalizeIconArgs(props.icon);

      if (!iconProp) {
        throw new Error("Invalid icon property value")
      }

      const icon = getIcon(iconProp);

      if (icon) {
        const pathStyle = {};
        const transform = [];
        const style = {};

        const iconSize = normalizeIconSize(props.size);

        if (iconSize) {
          style.width = `${iconSize}rem`;
          style.height = style.width;
        }

        const iconFlip = normalizeIconFlip(props.flip);

        if (iconFlip.horizontal) {
          transform.push("scaleX(-1)");
        }

        if (iconFlip.vertical) {
          transform.push("scaleY(-1)");
        }

        const iconRotate = normalizeIconRotate(props.rotate);

        if (iconRotate !== 0) {
          transform.push(`rotate(${iconRotate}deg)`);
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
        const iconSpin = normalizeIconSpin(props.spin);
        const spinSec = typeof iconSpin !== "number" ? 2 : iconSpin;
        let inverse = iconFlip.horizontal || iconFlip.vertical;

        if (spinSec < 0) {
          inverse = !inverse;
        }

        if (iconSpin) {
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
              ...(!(iconFlip.horizontal || iconFlip.vertical || iconRotate !== 0)
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

  return index;

})));
