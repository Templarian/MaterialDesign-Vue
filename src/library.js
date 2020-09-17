const definitions = {}
let id = 0

const camelize = (str) => {
  const arr = str.split("-")
  const capital = arr.map((item, index) =>
    index
      ? item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
      : item.toLowerCase()
  )

  return capital.join("")
}

export const getIcon = (iconName) => {
  const iconCamelName = camelize("mdi-" + iconName)

  if (Object.prototype.hasOwnProperty.call(definitions, iconCamelName)) {
    const iconDefinition = definitions[iconCamelName]

    id++

    return {
      id,
      path: iconDefinition,
    }
  }

  return false
}

export const library = {
  add(icons) {
    for (const [icon, path] of Object.entries(icons)) {
      definitions[icon] = path
    }
  },
  reset() {
    for (const icon of Object.getOwnPropertyNames(definitions)) {
      delete definitions[icon]
    }
  },
}
