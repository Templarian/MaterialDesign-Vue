import { nodeResolve } from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import babel from "@rollup/plugin-babel"

const name = "vue-mdi"

export default {
  input: "src/index.js",
  output: [
    {
      name,
      format: "umd",
      file: "dist/index.umd.js",
    },
    {
      name,
      format: "es",
      file: "dist/index.es.js",
    },
  ],
  plugins: [
    nodeResolve({
      mainFields: ["jsnext:main"],
    }),
    commonjs(),
    babel({
      babelrc: false,
      presets: [
        [
          "@babel/preset-env",
          {
            debug: true,
            targets: { browsers: ["> 1%", "last 2 versions", "ie > 9"] },
            modules: false,
            useBuiltIns: false,
          },
        ],
      ],
      exclude: "node_modules/**",
    }),
  ],
}
