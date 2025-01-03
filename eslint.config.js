import eslintConfigPrettier from '@vue/eslint-config-prettier'
import tailwind from 'eslint-plugin-tailwindcss'
import pluginVue from 'eslint-plugin-vue'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}']
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**', '**/.nuxt/**']
  },

  ...pluginVue.configs['flat/essential'],
  { plugins: { eslintConfigPrettier } },
  ...tailwind.configs['flat/recommended'],

  {
    rules: {
      'vue/multi-word-component-names': 'off'
    }
  }
]
