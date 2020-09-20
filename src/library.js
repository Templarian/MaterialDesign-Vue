const definitions = {
  mdi: {},
  mdil: {},
}
let id = 0

const parseIcon = (str) => {
  const parts = str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .toLowerCase()
    .split(" ")

  if (parts.length >= 2) {
    const prefix = parts[0]
    const name = parts.slice(1).join("-")

    return { prefix, name }
  }

  return false
}

export const getIcon = (icon) => {
  if (
    Object.prototype.hasOwnProperty.call(definitions, icon.prefix) &&
    Object.prototype.hasOwnProperty.call(definitions[icon.prefix], icon.name)
  ) {
    const iconDefinition = definitions[icon.prefix][icon.name]

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
    for (const [name, path] of Object.entries(icons)) {
      const icon = parseIcon(name)

      if (
        icon &&
        Object.prototype.hasOwnProperty.call(definitions, icon.prefix)
      ) {
        definitions[icon.prefix][icon.name] = path
      }
    }
  },
  reset() {
    for (const [prefix, icons] of Object.entries(definitions)) {
      for (const icon of Object.getOwnPropertyNames(icons)) {
        delete definitions[prefix][icon]
      }
    }
  },
}
