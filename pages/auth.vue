<script setup>
//const client = useSupabaseClient()
//const user = useSupabaseUser()

/*watchEffect(() => {
  if (user.value) {
    return navigateTo('/')
  }
})*/

/*const login = async (prov) => {
  const { data, error } = await client.auth.signInWithOAuth({
    provider: prov,
    redirectTo: window.location.origin
  })
  if (error) {
    console.log(error)
  }
}*/
</script>

<template>
  <div id="AuthPage" class="h-screen w-full pt-32">
    <div class="w-full">
      <div class="flex w-full items-center justify-center gap-2.5 p-2">
        <img alt="img" class="w-[35px]" src="/threads-logo.png" />
        <span class="text-2xl font-bold text-white">Threads</span>
      </div>

      <div class="mx-auto max-w-[350px] px-2 text-white">
        <div class="mb-6 mt-4 text-center">Login / Register</div>

        <button
          class="flex w-full items-center justify-center gap-3 rounded-full border p-1.5 text-lg font-semibold"
        >
          <div class="flex items-center justify-center gap-2">
            <img alt="img" class="w-full max-w-[30px] rounded-full" src="/github-logo.png" />
            Github
          </div>
        </button>
      </div>
    </div>
  </div>
</template>
