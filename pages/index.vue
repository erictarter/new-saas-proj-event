<template>
    <div class="p-4">
      <component :is="user ? 'HomeAuth' : 'HomeNonAuth'" />
      <HomeAuth v-if="user" />
      <HomeNonAuth v-if="!user"/>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  import { useAuthStore } from '../src/stores/auth'
  import authMiddleware from '../src/middleware/auth'
  
  // Store
  const authStore = useAuthStore()
  
  // Computed Properties
  const user = computed(() => authStore.user)
  
  definePageMeta({
    middleware: authMiddleware
  })
  </script>