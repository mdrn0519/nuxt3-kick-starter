// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  srcDir: 'src/',
  modules: ['@nuxt/ui', '@nuxt/image'],
  image: {
    dir: 'assets/image',
  },
});
