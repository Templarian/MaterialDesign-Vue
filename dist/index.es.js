function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = o[Symbol.iterator]();
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

var definitions = {};
var id = 0;

var camelize = function camelize(str) {
  var arr = str.split("-");
  var capital = arr.map(function (item, index) {
    return index ? item.charAt(0).toUpperCase() + item.slice(1).toLowerCase() : item.toLowerCase();
  });
  return capital.join("");
};

var getIcon = function getIcon(iconName) {
  var iconCamelName = camelize("mdi-" + iconName);

  if (Object.prototype.hasOwnProperty.call(definitions, iconCamelName)) {
    var iconDefinition = definitions[iconCamelName];
    id++;
    return {
      id: id,
      path: iconDefinition
    };
  }

  return false;
};
var library = {
  add: function add(icons) {
    for (var _i = 0, _Object$entries = Object.entries(icons); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          icon = _Object$entries$_i[0],
          path = _Object$entries$_i[1];

      definitions[icon] = path;
    }
  },
  reset: function reset() {
    var _iterator = _createForOfIteratorHelper(Object.getOwnPropertyNames(definitions)),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var icon = _step.value;
        delete definitions[icon];
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
};

var removeMdiPrefix = function removeMdiPrefix(str) {
  return str.replace("mdi-", "");
};

var VueMdi = {
  name: "VueMdi",
  functional: true,
  props: {
    icon: {
      type: String,
      required: true
    },
    title: {
      type: [Object, String],
      default: null
    },
    description: {
      type: [Object, String],
      default: null
    },
    size: {
      type: [Object, Number],
      default: null
    },
    color: {
      type: String,
      default: "#000"
    },
    horizontal: {
      type: Boolean,
      default: false
    },
    vertical: {
      type: Boolean,
      default: false
    },
    rotate: {
      type: Number,
      default: 0
    },
    spin: {
      type: [Boolean, Number],
      default: false
    }
  },
  render: function render(createElement, _ref) {
    var props = _ref.props,
        _v = _ref._v;
    var iconName = removeMdiPrefix(props.icon);
    var icon = getIcon(iconName);

    if (icon) {
      var pathStyle = {};
      var transform = [];
      var style = {};

      if (props.size) {
        style.width = "".concat(props.size * 1.5, "rem");
        style.height = style.width;
      }

      if (props.horizontal) {
        transform.push("scaleX(-1)");
      }

      if (props.vertical) {
        transform.push("scaleY(-1)");
      }

      if (props.rotate !== 0) {
        transform.push("rotate(".concat(props.rotate, "deg)"));
      }

      if (props.color !== null) {
        pathStyle.fill = props.color;
      }

      var pathElement = createElement("path", {
        attrs: {
          d: icon.path
        },
        style: pathStyle
      });

      if (transform.length > 0) {
        style.transform = transform.join(" ");
        style.transformOrigin = "center";
      }

      var spinElement = pathElement;
      var spinSec = typeof props.spin !== "number" ? 2 : props.spin;
      var inverse = props.horizontal || props.vertical;

      if (spinSec < 0) {
        inverse = !inverse;
      }

      if (props.spin) {
        spinElement = createElement("g", {
          style: {
            animation: "spin".concat(inverse ? "-inverse" : "", " linear ").concat(Math.abs(spinSec), "s infinite"),
            transformOrigin: "center"
          }
        }, [pathElement].concat(_toConsumableArray(!(props.horizontal || props.vertical || props.rotate !== 0) ? createElement("rect", {
          attrs: {
            width: 24,
            height: 24,
            fill: "transparent"
          }
        }) : [])));
      }

      var ariaLabelledby;
      var labelledById = "icon_labelledby_".concat(icon.id);
      var describedById = "icon_describedby_".concat(icon.id);
      var role;

      if (props.title) {
        ariaLabelledby = props.description ? "".concat(labelledById, " ").concat(describedById) : labelledById;
      } else {
        role = "img";

        if (props.description) {
          throw new Error("title attribute required when description is set");
        }
      }

      return createElement("svg", {
        attrs: {
          viewBox: "0 0 24 24",
          role: role,
          "aria-labelledby": ariaLabelledby
        },
        class: "mdi-icon",
        style: style
      }, [].concat(_toConsumableArray(props.title ? [createElement("title", {
        attrs: {
          id: labelledById
        }
      }, _v(props.title))] : []), _toConsumableArray(props.description ? [createElement("desc", {
        attrs: {
          id: describedById
        }
      }, _v(props.description))] : []), [spinElement]));
    }

    return null;
  }
};

export { VueMdi, library };
