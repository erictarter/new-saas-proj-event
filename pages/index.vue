<template>
  <div class="p-4">
    <HomeAuth v-if="isAuthenticated" />
    <HomeNonAuth v-else />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '../src/stores/auth'
import authMiddleware from '../src/middleware/auth'

// Store
const authStore = useAuthStore()

// Computed Properties
const isAuthenticated = computed(() => {
  const user = authStore.getCurrentUser
  return user && user.emailVerified
})

definePageMeta({
  middleware: authMiddleware
})
</script>