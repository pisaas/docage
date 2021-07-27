// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

const resolve = (dir) => {
  return path.resolve(__dirname, dir)
}

// 项目部署基础
// 默认情况下，我们假设你的应用将被部署在域的根目录下,
// 例如：https://www.my-app.com/
// 默认：'/'
// 如果您的应用程序部署在子路径中，则需要在这指定子路径
// 例如：https://www.foobar.com/my-app/
// 需要将它改为'/my-app/'

module.exports = {
  publicPath: '/',

  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: (config) => {
    config.resolve.alias.set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))

    config.resolve.symlinks(false)

    config.plugin('html').tap((definitions) => {
      definitions[0].title = process.env.VUE_APP_NAME
      return definitions
    })

    config.plugin('define').tap((definitions) => {
      definitions[0]['process.env'] = JSON.stringify({
        NODE_ENV: process.env.NODE_ENV,
        APP_ID: process.env.VUE_APP_ID,
        APP_NAME: process.env.VUE_APP_NAME,
        SPACE_ID: process.env.VUE_APP_SPACE_ID,
        SPACE_NAME: process.env.VUE_APP_SPACE_NAME,
        BASE_URL: process.env.VUE_APP_BASE_URL,
        API_BASE_URL: process.env.VUE_APP_API_BASE_URL,
        RESC_BASE_URL: process.env.VUE_APP_RESC_BASE_URL
      })
      return definitions
    })
  },

  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },

  // 打包时不生成.map文件
  productionSourceMap: false,

  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
  devServer: {
    disableHostCheck: true,
    host: '0.0.0.0',
    port: '8060'
    // proxy: 'localhost:3000'
    //
    //   overlay: {
    //     warnings: false,
    //     errors: false
    //   }
  },

  // 禁用eslint
  lintOnSave: process.env.NODE_ENV !== 'production',

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [resolve('src/styles/theme.scss')]
    }
  }
}
