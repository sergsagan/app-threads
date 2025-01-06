<script setup>
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const runtimeConfig = useRuntimeConfig()

let isMenu = ref(false)
let isLike = ref(false)
let isDeleting = ref(false)

const emits = defineEmits(['isDeleted'])
const props = defineProps({ post: Object })

const client = useSupabaseClient()
const user = useSupabaseUser()

const hasLikedComputed = computed(() => {
  if (!user.value) {
    return true
  }
  let res = false

  props.post.likes.forEach((like) => {
    if (like.userId === user.value.identities[0].user_id && like.postId === props.post.id) {
      res = true
    }
  })
  return res
})

const deletePost = async (id, picture) => {
  let res = confirm(`Are you sure you want to delete this post?`)
  if (!res) {
    return false
  }

  try {
    {
      isMenu.value = false
      isDeleting.value = true

      const { data, error } = await client.storage.from('app-threads-files').remove([picture])
      await $fetch(`/api/delete-post/${id}`, { method: 'DELETE' })
      emits('isDeleted', true)

      isDeleting.value = false
    }
  } catch (error) {
    console.log(error)
    isDeleting.value = false
  }
}
</script>

<template>
  <div class="bottom-0 z-50 size-full">
    <div class="w-full py-2">
      <div class="flex items-center justify-between">
        <div class="flex items-center text-white">
          <img :src="post.image" alt="img" class="h-[35px] rounded-full" />
          <div class="ml-2 text-[18px] font-semibold">{{ post.name }}</div>
        </div>
        <div
          v-if="user && user.identities && user.identities[0].user_id === post.userId"
          class="relative"
          @click="isMenu = !isMenu"
        >
          <button
            :class="isMenu ? 'bg-gray-800' : ''"
            :disabled="isDeleting"
            class="flex h-[24px] cursor-pointer items-center rounded-full p-1 text-white hover:bg-gray-800"
          >
            <Icon v-if="!isDeleting" name="bi:three-dots" size="18" style="color: white" />
            <Icon v-else name="eos-icons:bubble-loading" size="18" style="color: white" />
          </button>

          <div v-if="isMenu" class="absolute right-0 z-20 mt-1 rounded border border-gray-600">
            <button
              class="flex w-full items-center justify-between gap-2 rounded bg-black py-1 pl-4 pr-3 text-red-500 hover:bg-gray-900"
              @click="deletePost(post.id, post.picture)"
            >
              <div>Delete</div>
              <Icon name="solar:trash-bin-trash-broken" size="20" />
            </button>
          </div>
        </div>
      </div>
      <div class="relative flex w-full items-center">
        <div class="mx-auto w-[42px]">
          <div class="absolute top-0 ml-4 mt-1 h-full w-px bg-gray-700" />
        </div>
        <div class="w-[calc(100%-50px)] rounded-lg bg-black text-sm font-light">
          <div class="py-2 text-gray-300">{{ post.text }}</div>
          <img
            v-if="post && post.picture"
            :src="runtimeConfig.public.bucketUrl + post.picture"
            alt="img"
            class="mx-auto mt-2 w-full rounded pr-2"
          />

          <div class="absolute ml-2 mt-2 w-full">
            <button :disabled="isLike" class="flex items-center gap-1">
              <Icon
                class="cursor-pointer rounded-full p-1 text-white hover:bg-gray-800"
                name="mdi:cards-heart-outline"
                size="28"
              />
            </button>
            <div class="relative text-sm text-gray-500">
              <div>
                <span>4</span>
                likes
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="relative inline-block pb-1.5 pt-1 text-gray-500">
      <div class="flex items-center">
        <div class="flex w-[42px] flex-wrap items-center gap-1 text-white">
          <div class="flex gap-0.5">
            <img
              alt="img"
              class="mt-2 h-[14px] rounded-full"
              src="https://picsum.photos/id/202/50"
            />
            <img alt="img" class="h-[17px] rounded-full" src="https://picsum.photos/id/223/50" />
          </div>
          <div class="flex items-center">
            <img
              alt="img"
              class="ml-4 h-[11px] rounded-full"
              src="https://picsum.photos/id/99/50"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="mt-3 h-px w-full bg-gray-800" />
  </div>
</template>
