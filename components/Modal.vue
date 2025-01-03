<script setup>
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
//const client = useSupabaseClient()

/*const logout = () => {
  client.auth.signOut()
  userStore.isLogoutOverlay = false
  return navigateTo('/')
}*/
</script>

<template>
  <div
    id="Modal"
    class="fixed bottom-0 z-50 grid h-screen w-full place-items-center bg-black/50 backdrop-blur-md"
  >
    <div class="w-full max-w-[300px] rounded-lg border border-gray-600 bg-black p-2 text-white">
      <button
        class="flex w-full items-center justify-between bg-black p-3"
        @click="userStore.isLogoutOverlay = false"
      >
        <div>Close Modal</div>
        <Icon name="mdi:close" size="25" />
      </button>
      <div class="my-1 border-b border-b-gray-700" />
      <button class="flex w-full items-center justify-between bg-black p-3">
        <div>Log Out</div>
        <Icon name="ph:sign-out" size="25" />
      </button>
    </div>
  </div>
</template>
