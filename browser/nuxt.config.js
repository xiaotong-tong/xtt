import { defineNuxtConfig } from '@nuxt/bridge';

import dotenv from 'dotenv';
dotenv.config();

export default defineNuxtConfig({
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
      '@/assets/css/textborder.css'
    ],
    app: "/",
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
    plugins: [
      // '~/plugins/axios',
      '~plugins/commom',
    ],
    axios: {
      proxy: true
    },
    server: {
      port: 80,
      host: '0.0.0.0',
    },
    // ssr: true,
    proxy: {
      '/api': {
        target: 'http://' + process.env.API_HOST_LOCAL + ':' + process.env.API_POST,
        secure: false,
        changeOrigin: true
      }
    },
    // build: {
    //   vendor: ['element-ui'],
    //   babel: {
    //     plugins: [
    //       [
    //         'component',
    //         { libraryName: 'element-ui', styleLibraryName: 'theme-chalk' }
    //       ]
    //     ]
    //   }
    // }
})
