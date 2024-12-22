<template>
    <div class="p-4 max-w-md mx-auto">
      <h1 class="text-3xl font-bold mb-6">Verify Your Email</h1>
      <p class="mb-4">Please check your email and click on the verification link. This page will automatically refresh to check if your email has been verified.</p>
      <div v-if="errorMessage" class="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <span class="block font-bold sm:inline">{{ errorMessage }}</span>
      </div>
      <div v-if="successMessage" class="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
        <span class="block font-bold sm:inline">{{ successMessage }}</span>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '../src/stores/auth'
  import { getAuth, onAuthStateChanged } from 'firebase/auth'
  
  const errorMessage = ref('')
  const successMessage = ref('')
  
  // Store
  const authStore = useAuthStore()
  
  // Router
  const router = useRouter()
  
  // Polling function
  const pollEmailVerification = async () => {
    const auth = getAuth()
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        await user.reload()
        if (user.emailVerified) {
          successMessage.value = 'Your email has been verified. You can now log in.'
          setTimeout(() => {
            router.push('/signin')
          }, 3000)
        } else {
          setTimeout(pollEmailVerification, 5000)
        }
      } else {
        errorMessage.value = 'No user is signed in.'
      }
    })
  }
  
  onMounted(() => {
    pollEmailVerification()
  })
  </script>
  
  <style scoped>
  /* Add any necessary styles here */
  </style>