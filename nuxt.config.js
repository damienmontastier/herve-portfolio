export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Portfolio Hervé'
      },
      { name: 'theme-color', content: '#1A1A1A' },
      { name: 'msapplication-TileColor', content: '#1A1A1A' },
      { name: 'mobile-web-app-capable', content: 'yes' },
      {
        hid: `og:title`,
        property: 'og:title',
        content: 'Portfolio Hervé'
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'Portfolio Hervé'
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'Portfolio Hervé'
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: ''
      },
      {
        hid: 'og:image:width',
        property: 'og:image:width',
        content: '1200'
      },
      {
        hid: 'og:image:height',
        property: 'og:image:height',
        content: '630'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: ''
      },
      {
        hid: 'twitter:card',
        property: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        hid: 'twitter:title',
        property: 'twitter:title',
        content: 'Portfolio Hervé'
      },
      {
        hid: 'twitter:description',
        property: 'twitter:description',
        content: 'Portfolio Hervét'
      },
      {
        hid: 'twitter:site',
        property: 'twitter:site',
        content: ''
      },
      {
        hid: 'twitter:image',
        property: 'twitter:image',
        content: ''
      },
      {
        hid: 'twitter:url',
        property: 'twitter:url',
        content: ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['@/assets/scss/main.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/bus', { src: '~/plugins/cursor', ssr: false }],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/eslint-module'],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
