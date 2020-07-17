module.exports = {
  publicPath: '/file/',
  productionSourceMap: false,
  configureWebpack: () => {
    if (process.env.NODE_ENV !== 'production') {
      return {
        resolve: {
          alias: {
            vue$: 'vue/dist/vue.js'
          }
        }
      };
    }
  },
  devServer: {
    port: 8888
  }
};