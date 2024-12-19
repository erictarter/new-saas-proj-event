<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <main class="flex-grow w-full p-4">
      <slot />
    </main>
    <Footer />
    <LoadingSpinner v-if="loading || !vueLoaded" />
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

onMounted(() => {
  vueLoaded.value = true
})

const loading = computed(() => authStore.isLoading)

</script>

<style scoped>
/* Add any necessary styles here */
</style>