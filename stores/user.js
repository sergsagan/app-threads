import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    post: [],
    isMenuOverlay: false,
    isLogoutOverlay: false
  })
})
