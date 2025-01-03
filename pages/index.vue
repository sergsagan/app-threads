<script setup>
import BaseLayout from '@/layouts/BaseLayout.vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
//const user = useSupabaseUser()

let posts = ref([])
let isPosts = ref(true)
let isLoading = ref(false)

onBeforeMount(() => {
  posts.value = [
    {
      name: 'Serg Sagan',
      image: 'https://placehold.co/100',
      text: 'This is the title of Serg Sagan',
      picture: 'https://placehold.co/500'
    }
  ]
})
</script>

<template>
  <BaseLayout>
    <div id="IndexPage" class="w-full overflow-auto">
      <div class="mx-auto max-w-[500px] overflow-hidden">
        <div id="Posts" class="mx-auto max-w-[600px] px-4">
          <div v-if="isPosts">
            <div v-for="post in posts" :key="post">
              <Post :post="post" @isDeleted="posts = []" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>
