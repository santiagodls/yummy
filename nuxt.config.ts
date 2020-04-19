import { Configuration } from '@nuxt/types'
import Mode from 'frontmatter-markdown-loader/mode'

export default {
  mode: 'universal',
  srcDir: 'src',
  /**
   * Server config
   */
  server: {
    port: 8000,
    host: '0.0.0.0'
  },
  /*
   * Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Quicksand:400,500,600&display=swap' }
    ]
  },
  /*
   * Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxt/typescript-build'
  ],
  /*
   * Nuxt.js modules
   */
  modules: [
    '@nuxtjs/pwa'
  ],
  /*
   * Nuxt.js plugins
   */
  plugins: [
    '@/plugins/element-ui'
  ],
  /**
   * Build config
   */
  build: {
    loaders: {
      scss: {
        prependData: '@import "@/assets/styles/element-vars.scss";'
      }
    },
    extend (config) {
      /* eslint-disable */
      config.module?.rules.push({
        test: /\.md$/,
        loader: "frontmatter-markdown-loader",
        options: {
          mode: [Mode.VUE_COMPONENT, Mode.META]
        }
      })
      /* eslint-enable */
    }
  },
  /**
   * Router config
   */
  router: {
    routeNameSplitter: '/',
    base: '/yummy/'
  }
} as Configuration
