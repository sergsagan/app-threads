<script setup>
import { useUserStore } from '@/stores/user'

//import { v4 as uuidv4 } from 'uuid'

const userStore = useUserStore()
//const client = useSupabaseClient()
//const user = useSupabaseUser()

let text = ref(null)
let isLoading = ref(false)

const adjustTextareaHeight = () => {
  let textarea = document.getElementById('textarea')
  textarea.style.height = 'auto'
  textarea.style.height = textarea.scrollHeight + 'px'
}

let file = ref(null)
let fileDisplay = ref(null)
let fileData = ref(null)

const clearData = () => {
  text.value = null
  file.value = null
  fileDisplay.value = null
  fileData.value = null
}

const onChange = () => {
  fileDisplay.value = URL.createObjectURL(file.value.files[0])
  fileData.value = file.value.files[0]
}

const handleClose = () => {
  userStore.isMenuOverlay = false
  clearData()
}
</script>

<template>
  <div class="fixed bottom-0 z-50 size-full overflow-hidden">
    <div class="size-full overflow-auto bg-black text-white">
      <div
        class="mx-auto flex max-w-[500px] items-center justify-start border-b border-b-gray-700 py-4"
      >
        <button class="rounded-full px-2" @click="handleClose">
          <Icon name="material-symbols:close-small" size="25" />
        </button>
        <div class="text-[16px] font-semibold">New Thread</div>
      </div>
      <div id="Post" class="bottom-0 z-40 mx-auto max-h-[100vh-200px] w-full max-w-[500px] px-3">
        <div class="w-full py-2">
          <div class="flex items-center">
            <div class="flex items-center text-white">
              <img alt="img" src="https://picsum.photos/id/223/50" />
              <div class="ml-2 text-[18px] font-semibold">Serg Sagan</div>
            </div>
          </div>
          <div class="relative flex w-full items-center">
            <div class="mx-auto w-[42px]">
              <div class="absolute top-0 ml-4 mt-1 h-full w-px bg-gray-700" />
            </div>
            <div class="w-full text-ellipsis rounded-lg bg-black font-light">
              <div class="w-full bg-black pt-2 text-gray-300">
                <textarea
                  id="textarea"
                  v-model="text"
                  class="w-full bg-black outline-none"
                  placeholder="Start a thread..."
                  style="resize: none"
                  @input="adjustTextareaHeight()"
                ></textarea>
              </div>
              <div class="w-full">
                <div class="flex flex-col gap-2 py-1">
                  <div v-if="fileDisplay">
                    <img :src="fileDisplay" alt="img" class="mx-auto mr-2 mt-2 w-full rounded-lg" />
                  </div>
                  <label for="fileInput">
                    <Icon name="clarity:paperclip-line" size="25" style="color: white" />
                    <Input
                      id="fileInput"
                      ref="file"
                      accept=".jpg, .jpeg, .png"
                      hidden
                      type="file"
                      @input="onChange"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        v-if="text"
        :class="isLoading ? 'text-gray-600' : 'text-blue-600'"
        :disabled="isLoading"
        class="fixed bottom-0 float-right inline-block w-full border-t border-t-gray-700 bg-black p-4 text-lg font-bold"
      >
        <div v-if="!isLoading">Post</div>
        <div v-else class="flex items-center justify-center gap-2">
          <Icon name="eos-icons:bubble-loading" size="25" />
          Please wait...
        </div>
      </button>
    </div>
  </div>
</template>
