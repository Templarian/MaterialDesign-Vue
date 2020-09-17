# MaterialDesign-Vue

VueJS/VueTS Component for Material Design Icons

[Patreon](https://www.patreon.com/cryptomath)

## Installation

Install the icon content [@mdi/js](https://github.com/Templarian/MaterialDesign-JS) package and this module

```
npm install --save @mdi/js
npm install --save @mdi/vue
```

And import VueMdi `css` file in your app entry point

```
import '@mdi/vue/dist/mdi.css';
```

## Usage

### Recommended

The following examples are based on a project configured with [vue-cli](https://github.com/vuejs/vue-cli).

`src/main.js`

```javascript
import Vue from 'vue'
import App from './App'
import { VueMdi, library } from '@mdi/vue'
import { mdiAccount } from '@mdi/js'
import '@mdi/vue/dist/mdi.css';

library.add({ mdiAccount })

Vue.component('vue-mdi', VueMdi)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
```

`src/App.vue`

```vue
<template>
  <div id="app">
    <vue-mdi icon="account" />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
```

### Using the concept of a library

Explicitly selecting icons offer the advantage of only bundling the icons that you
use in your final bundled file. This allows us to subset MDI's
thousands of icons to just the small number that are normally used.

#### Import the specific icons that you need

```javascript
import { library } from '@mdi/vue'
import { mdiAccount, mdiBlockHelper } from '@mdi/js';

library.add({ mdiAccount, mdiBlockHelper })
```

#### Reset all loaded icons

```javascript
import { library } from '@mdi/vue'

library.reset()
```

## VueMdi component props

| Prop        | PropTypes      | Default  | Details |
|-------------|----------------|----------|---------|
| icon        | string         | required | MDI icon name in kebab-case format (without the `mdi-` prefix). Make sure that you added this icon from [@mdi/js](https://templarian.github.io/@mdi/js) to library |
| title       | string, null   | `null`   | A11y `<title>{title}</title>` |
| description | string, null   | `null`   | A11y `<desc>{desc}</desc>` |
| size        | number, string | `null`   | Icon size. Will be converted to `{size * 1.5}rem` |
| color       | string         | `#000`     | Icon color. Can accept any CSS color value |
| horizontal  | bool           | `false ` | Flip Horizontal |
| vertical    | bool           | `false`  | Flip Vertical |
| rotate      | number         | `0 `     | Degrees `0` to `360` |
| spin        | bool, number   | `false`  | Adding animation for icon spin. If a number is set, it is equal to the number of seconds for a full rotation of the icon. If set to `true`, the number of seconds is `2`. Counterclockwise |

> Note: Additional props will be applied to the `<svg>` element.

## Development

To develop clone the repo and run `npm install`.

### Tasks

Command     | Purpose
---         | ---
build       | Build a development version of the library using Rollup
dist        | Build a production version of the library using Rollup
test        | Execute unit tests
lint        | Run [ESlint](https://eslint.org/) for lint project files

## Related Packages

[NPM @MDI Organization](https://npmjs.com/org/mdi)

- JavaScript/Typescript: [MaterialDesign-JS](https://github.com/Templarian/MaterialDesign-JS)
- React: [MaterialDesign-React](https://github.com/Templarian/MaterialDesign-React)
- Webfont: [MaterialDesign-Webfont](https://github.com/Templarian/MaterialDesign-Webfont)
