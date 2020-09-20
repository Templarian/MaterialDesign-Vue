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

### Add more icons packs

You can also include a set of [Material Design Icons Light](https://github.com/Templarian/MaterialDesignLight)

```
npm install --save @mdi/light-js
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

#### Using default icons

```javascript
import { library } from '@mdi/vue'
import { mdiAccount } from '@mdi/js'

library.add({ mdiAccount })
```

```html
<!-- The default MDI icons is implicit -->
<vue-mdi icon="account" />

<!-- It's better to be explicit -->
<vue-mdi :icon="['mdi', 'account']" />
```

#### Using Light icons

```javascript
import { library } from '@mdi/vue'
import { mdilAccount } from '@mdi/light-js'

library.add({ mdilAccount })
```

```html
<vue-mdi :icon="['mdil', 'account']" />
```

### The icon property

The `icon` property of the `VueMdi` component can be used in the following way:

#### Shorthand that assumes a prefix of `mdi`

```html
<vue-mdi icon="android" />
<vue-mdi icon="facebook" />

<vue-mdi :icon="['mdi', 'android']" /> # Same as above
<vue-mdi :icon="['mdi', 'facebook']" /> # Same as above
```

For the above to work you must add the `android` and `facebook` icon to the library.

```javascript
import { library } from '@mdi/vue'
import { mdiAndroid, mdiFacebook } from '@mdi/js'

library.add({ mdiAndroid, mdiFacebook })
```

In the event that you are using an icon with a multi-word name please note that
you would need to pass in the icon name using _kebab-case_ as opposed to _camelCase_.

```html
<vue-mdi icon="android" />  # import { mdiAndroid } from '@mdi/js'
```

#### Explicit prefix

```html
<vue-mdi :icon="['mdi', 'facebook']" />
```

For the above to work you must add the `facebook` icon (MDI default pack) to the library.

```javascript
import { library } from '@mdi/vue'
import { mdiFacebook } from '@mdi/js'

library.add({ mdiFacebook })
```

#### Icon property declared by the object
```vue
<template>
  <div id="app">
    <vue-mdi :icon="icon" />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      icon: {
        prefix: 'mdil',
        name: 'account'
      }
    }
  }
}
</script>
```

For the above to work you must add the MDI Light `account` icon to the library.

```javascript
import { library } from '@mdi/vue'
import { mdilAccount } from '@mdi/light-js'

library.add({ mdilAccount })
```

### Using the concept of a library

Explicitly selecting icons offer the advantage of only bundling the icons that you
use in your final bundled file. This allows us to subset MDI's
thousands of icons to just the small number that are normally used.

#### Import the specific icons that you need

```javascript
import { library } from '@mdi/vue'
import { mdiAccount, mdiBlockHelper } from '@mdi/js'
import { mdilAccount } from '@mdi/light-js'

library.add({ mdiAccount, mdiBlockHelper, mdilAccount })
```

#### Reset all loaded icons

```javascript
import { library } from '@mdi/vue'

library.reset()
```

## VueMdi component props

| Prop        | PropTypes      | Default  | Details |
|-------------|----------------|----------|---------|
| icon        | object, array, string | required | MDI icon property (see above). Make sure that you added this icon from [@mdi/js](https://github.com/Templarian/MaterialDesign-JS) or [@mdi/light-js](https://github.com/Templarian/MaterialDesignLight-JS) to the library |
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
