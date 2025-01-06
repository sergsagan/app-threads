<script setup>
import BaseLayout from '@/layouts/BaseLayout.vue'
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
const user = useSupabaseUser()

let posts = ref([])
let isPosts = ref(false)
let isLoading = ref(false)

watchEffect(() => {
  if (!user.value) {
    return navigateTo('/auth')
  }
})

onBeforeMount(async () => {
  try {
    isLoading.value = true
    await userStore.getAllPosts()
    isLoading.value = false
  } catch (error) {
    console.log(error)
  }
})

onMounted(() => {
  watchEffect(() => {
    if (userStore.posts && userStore.posts.length >= 1) {
      posts.value = userStore.posts
      isPosts.value = true
    }
  })
})

watch(
  () => posts.value,
  () => {
    if (userStore.posts && userStore.posts.length >= 1) {
      posts.value = userStore.posts
      isPosts.value = true
    }
  },
  { deep: true }
)
</script>

<template>
  <BaseLayout>
    <div id="IndexPage" class="w-full overflow-auto">
      <div class="mx-auto max-w-[500px] overflow-hidden">
        <div id="Posts" class="mx-auto max-w-[600px] px-4">
          <div v-if="isPosts">
            <div v-for="post in posts" :key="post">
              <Post :post="post" @isDeleted="posts = userStore.getAllPosts()" />
            </div>
          </div>
          <div v-else>
            <client-only>
              <div v-if="isLoading" class="mx-auto mt-20 flex w-full items-center justify-center">
                <div class="mx-auto flex flex-col items-center justify-center text-white">
                  <Icon name="eos-icons:bubble-loading" size="50" style="color: white" />
                  <div class="mt-1 w-full">Loading...</div>
                </div>
              </div>
              <div v-if="!isLoading" class="mx-auto mt-20 flex w-full items-center justify-center">
                <div class="mx-auto flex flex-col items-center justify-center text-white">
                  <Icon name="tabler:mood-empty" size="50" style="color: white" />
                  <div class="w-full">Make the first post!</div>
                </div>
              </div>
            </client-only>
          </div>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>
