module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        debug: true,
        targets: {
          node: "current",
        },
        modules: false,
        useBuiltIns: false,
      },
    ],
  ],
  plugins: ["@babel/plugin-transform-modules-commonjs"],
}
