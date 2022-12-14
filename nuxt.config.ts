// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  publicRuntimeConfig: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
  },
  privateRuntimeConfig: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
  },
  typescript: {
    strict: true
  } ,
   alias: {
    'class-validator': 'class-validator/cjs/index.js',
  },
  nitro: {
    preset: 'firebase'
  }
});