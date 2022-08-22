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
    //baseURL: "/CarPlatesWeb",
  },
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
