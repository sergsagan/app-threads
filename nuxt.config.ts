// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  pages: true,
  modules: [
    '@nuxt/icon',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
    '@pinia/nuxt',
    '@vite-pwa/nuxt'
  ],
  icon: {
    serverBundle: {
      collections: ['uil', 'ms', 'bi', 'ei', 'tabler', 'solar', 'mdi', 'eos-icons', 'ph']
    }
  },
  supabase: {
    redirect: false
  },
  runtimeConfig: {
    public: {
      bucketUrl: process.env.BUCKET_URL
    }
  },
  ssr: false,
  devtools: { enabled: false }
})
