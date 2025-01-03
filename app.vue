<script setup>
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
</script>
<template>
  <div class="fixed h-full w-[calc(100%+1px)] bg-black">
    <NuxtPage />

    <CreatePost
      :class="[
        { 'visible max-h-screen transition-all duration-200 ease-in': userStore.isMenuOverlay },
        { 'invisible max-h-0 transition-all duration-200 ease-out': !userStore.isMenuOverlay }
      ]"
    />
  </div>
</template>
