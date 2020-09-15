const definitions = {
  mdi: {},
}

function camelize(str) {
  const arr = str.split("-")
  const capital = arr.map((item, index) =>
    index
      ? item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
      : item.toLowerCase()
  )

  return capital.join("")
}

function getIconFreeId() {
  let id = 0

  for (let prefixIcons of Object.values(definitions)) {
    for (let icon of Object.values(prefixIcons)) {
      id += icon.usage
    }
  }

  return id + 1
}

export function addIcons(icons, prefix) {
  if (Object.prototype.hasOwnProperty.call(definitions, prefix)) {
    for (const [icon, path] of Object.entries(icons)) {
      definitions[prefix][icon] = {
        path,
        usage: 0,
      }
    }
  }
}

export function getIcon(icon) {
  const iconCamelName = camelize(icon.name)

  if (
    Object.prototype.hasOwnProperty.call(definitions, icon.prefix) &&
    Object.prototype.hasOwnProperty.call(
      definitions[icon.prefix],
      iconCamelName
    )
  ) {
    const iconDefinition = definitions[icon.prefix][iconCamelName]
    const iconId = getIconFreeId()

    iconDefinition.usage++

    return {
      id: iconId,
      path: iconDefinition.path,
    }
  }

  return false
}
