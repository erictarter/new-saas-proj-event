<template>
  <div class="p-4 mt-6 max-w-md mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-center text-indigo-600">Verify Your Email</h1>
    <p class="mb-4 text-gray-700">An email has been sent to <strong>{{ userEmail }}</strong>. Please check your inbox and click on the verification link.</p>
    <div v-if="errorMessage" class="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex items-center" role="alert">
      <i class="material-icons mr-2">error_outline</i>
      <span class="block font-bold sm:inline">{{ errorMessage }}</span>
    </div>
    <div v-if="successMessage" class="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative flex items-center" role="alert">
      <i class="material-icons mr-2">check_circle_outline</i>
      <span class="block font-bold sm:inline">{{ successMessage }}</span>
    </div>
    <div v-if="successMessage" class="mt-12 text-center">
        <nuxt-link to="/" class="block w-full px-6 py-3 text-white rounded bg-pink-500 shadow hover:bg-pink-600"><strong>Get Started</strong></nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../src/stores/auth'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const errorMessage = ref('')
const successMessage = ref('')
const userEmail = ref('')

// Store
const authStore = useAuthStore()

// Router
const router = useRouter()

// Polling function
const pollEmailVerification = async () => {
  const auth = getAuth()
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      userEmail.value = user.email || ''
      await user.reload()
      if (user.emailVerified) {
        successMessage.value = 'Your email has been verified! You can now access yout EventFlow profile.'
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