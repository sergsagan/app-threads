<script lang="ts" setup>
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
</script>

<template>
  <div id="BaseLayout" class="h-screen">
    <div class="mx-auto w-full max-w-[500px]">
      <div id="TopMenu" class="my-2 flex h-10 w-full items-center justify-center px-2">
        <img alt="logo" class="w-[35px]" src="/threads-logo.png" />
      </div>
    </div>
    <div class="mx-auto flex h-screen w-full max-w-[500px]">
      <slot />
    </div>
    <div
      id="BottomNav"
      class="fixed bottom-0 z-50 flex h-[70px] w-full border-t border-t-gray-700 bg-black"
    >
      <div class="mx-auto flex w-full max-w-[500px] items-center justify-around">
        <button class="size-full" @click="navigateTo('/')">
          <Icon name="material-symbols:home-outline" size="35" style="color: white" />
        </button>
        <button class="size-full" @click="userStore.isMenuOverlay = true">
          <Icon
            class="mb-1"
            name="material-symbols:edit-square-outline-rounded"
            size="32"
            style="color: white"
          />
        </button>
        <button class="size-full" @click="userStore.isLogoutOverlay = true">
          <Icon class="mb-1" name="ph:sign-out" size="32" style="color: white" />
        </button>
      </div>
    </div>
  </div>
</template>
