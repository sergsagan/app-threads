import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    post: [],
    isMenuOverlay: false,
    isLogoutOverlay: false
  }),

  actions: {
    async getAllPosts() {
      let res = await $fetch('/api/get-all-posts')

      this.posts = res
      return res
    }
  }
})
