<template>
    <div class="p-4 max-w-md mx-auto">
      <h1 class="text-3xl font-bold mb-6">Sign In</h1>
      <form @submit.prevent="signInUser">
        <input v-model="email" type="email" placeholder="Email" class="border p-2 rounded w-full mb-4" required />
        <input v-model="password" type="password" placeholder="Password" class="border p-2 rounded w-full mb-4" required />
        <button type="submit" class="bg-indigo-500 text-white px-4 py-2 rounded uppercase font-bold hover:bg-indigo-600 w-full">Sign In</button>
      </form>
      <p class="mt-4">Don't have an account? <nuxt-link to="/signup" class="text-blue-500 hover:underline">Sign Up</nuxt-link></p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '../src/stores/auth'
  
  // Store
  const authStore = useAuthStore()
  
  // Form data
  const email = ref('')
  const password = ref('')
  
  // Router
  const router = useRouter()
  
  // Sign-in function
  const signInUser = async () => {
    try {
      await authStore.signIn(email.value, password.value)
      router.push('/')
    } catch (error) {
      console.error('Error signing in:', error)
    }
  }
  </script>
  
  <style scoped>
  /* Add any necessary styles here */
  </style>