<template>
  <div class="flex flex-col min-h-screen z-75" :class="{ 'blurred': loading || !vueLoaded }">
    <div class="hidden lg:block">
      <Header />
    </div>
    <div class="block lg:hidden">
      <MobileHeader />
    </div>
    <main class="flex-grow w-full p-4 relative"">
      <transition name="fade" mode="out-in">
          <NuxtPage />
      </transition>
    </main>
    <Footer />
  </div>
  <LoadingSpinner v-if="loading || !vueLoaded" />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import authMiddleware from '../src/middleware/auth'
import { useAuthStore } from '../src/stores/auth'
import LoadingSpinner from '~/components/LoadingSpinner.vue'

const authStore = useAuthStore()

definePageMeta({
  middleware: authMiddleware
})

const vueLoaded = ref(false)

onMounted(async () => {
  await authStore.restoreAuthState()
  vueLoaded.value = true
  console.log(authStore.getCurrentUser)
})

const loading = computed(() => authStore.isLoading)

</script>

<style scoped>
/* Add any necessary styles here */
</style>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

.blurred {
  filter: blur(5px);
  transition: filter 0.3s;
  width: 100vw !important;
}
</style>