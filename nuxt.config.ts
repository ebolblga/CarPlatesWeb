import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "@nuxt/image-edge",
    "@intlify/nuxt3",
  ],
  tailwindcss: {
    cssPath: "/assets/css/tailwind.css",
    configPath: "tailwind.config.js",
    exposeConfig: false,
    injectPosition: 0,
    viewer: true,
  },
  app: {
    baseURL: process.env.NODE_ENV =="production" ? "/CarPlatesWeb": "/",
    buildAssetsDir: "/nuxt/",
    cdnURL:"https://ebolblga.github.io/CarPlatesWeb"
  },
  router:{
    base:process.env.NODE_ENV =="production" ? "/CarPlatesWeb/": "/"
  },
  // target:"static",
  intlify: {
    localeDir: "locales", 
    vueI18n: {
      fallbackLocale: "ru",
      // ...
    },
  },
  // router: {
  //   base: '/CarPlatesWeb/'
  // },
  //target:"static"
});
