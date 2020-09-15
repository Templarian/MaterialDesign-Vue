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
}
