const path = require("path");

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
    resolve: {
      alias: {
        vue$: "vue/dist/vue.runtime.esm.js",
        '@': path.resolve('src'),
      },
      extensions: ["*", ".js", ".vue", ".json"],
    },
  }
}