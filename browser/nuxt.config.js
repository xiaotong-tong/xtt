import dotenv from 'dotenv';
dotenv.config();
const fs = require("fs");
const path = require("path");

export default {
  head: {
    title: '星川漣の小窝',
    htmlAttrs: {
      lang: 'zh-CN'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: '小恸恸', content: '星川漣,小恸恸,サザナミ' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/lian.ico' }
    ]
  },
  css: [
    '@/assets/css/common.css',
    '@/assets/css/textborder.css',
    // { src:'element-ui/lib/theme-chalk/index.css' }
  ],
  plugins: [
    // '~/plugins/axios',
    { src:'~plugins/element-ui', ssr: true },
    '~plugins/commom',
  ],
  components: true,
  buildModules: [
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/dotenv',
    '@nuxtjs/toast'
  ],
  toast: {
    position: 'top-center',
    duration: 2000
  },
  axios: {
    proxy: true
  },
  server: {
    port: 80,
    host: '0.0.0.0',
  },
  proxy: {
    '/appdetails': {
      target: 'https://store.steampowered.com/api',
      secure: false,
      changeOrigin: true
    },
    '/api': {
      target: 'http://' + process.env.API_HOST_LOCAL + ':' + process.env.API_POST,
      secure: false,
      changeOrigin: true
    }
  },
  build: {
    vendor: ['element-ui'],
    babel: {
      plugins: [
        [
          'component',
          { libraryName: 'element-ui', styleLibraryName: 'theme-chalk' }
        ]
      ]
    }
  }
}
