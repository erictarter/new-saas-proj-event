<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <main class="flex-grow w-full p-4 relative">
      <transition name="fade" mode="out-in">
        <div :class="{ 'blurred': loading || !vueLoaded }">
          <NuxtPage />
        </div>
      </transition>
      <LoadingSpinner v-if="loading || !vueLoaded" />
    </main>
    <Footer />
  </div>
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
}
</style>