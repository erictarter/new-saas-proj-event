<template>
  <div class="p-4 max-w-md mx-auto">
    <h1 class="text-3xl font-bold mb-6">Sign In</h1>
    <div v-if="errorMessage" class="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <span class="block font-bold sm:inline">{{ errorMessage }}</span>
      <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
        <svg @click="closeAlert" class="fill-current h-6 w-6 text-red-500 cursor-pointer" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 5.652a1 1 0 00-1.414 0L10 8.586 7.066 5.652a1 1 0 10-1.414 1.414L8.586 10l-2.934 2.934a1 1 0 101.414 1.414L10 11.414l2.934 2.934a1 1 0 001.414-1.414L11.414 10l2.934-2.934a1 1 0 000-1.414z"/></svg>
      </span>
    </div>
    <form @submit.prevent="signInUser">
      <input v-model="email" type="email" placeholder="Email" class="border p-2 rounded w-full mb-4" required />
      <input v-model="password" type="password" placeholder="Password" class="border p-2 rounded w-full mb-4" required />
      <button type="submit" class="bg-indigo-500 text-white px-4 py-2 rounded uppercase font-bold hover:bg-indigo-600 w-full">Sign In</button>
    </form>
    <p class="mt-4">Don't have an account? <nuxt-link to="/signup" class="text-blue-500 hover:underline">Sign Up</nuxt-link></p>
    <nuxt-link to="/forgot-password" class="mt-1 text-blue-500 hover:underline">Forgot Password?</nuxt-link>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../src/stores/auth'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { db, auth } from '~/plugins/firebase'

const errorMessage = ref('')

// Store
const authStore = useAuthStore()

// Form data
const email = ref('')
const password = ref('')

const router = useRouter()

const signInUser = async () => {
  authStore.setLoading(true);  
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
    const user = userCredential.user

    if (!user.emailVerified) {
      errorMessage.value = 'Please verify your email before signing in.'
      authStore.setLoading(false);  
      return
    }

    const userDoc = await getDoc(doc(db, 'users', user.uid))
    if (userDoc.exists()) {
      console.log('User data:', userDoc.data())
      authStore.setUser(user)
      authStore.setLoading(false);  
      router.push('/')
    } else {
      console.log('No such document!')
      errorMessage.value = 'No user data found. Please contact support.'
      authStore.setLoading(false);  
    }
  } catch (error) {
    console.error('Error signing in:', error)
    if (error.code === 'auth/invalid-credential') {
      errorMessage.value = 'Invalid email or password. Please try again.'
    } else {
      errorMessage.value = 'An error occurred during sign-in. Please try again.'
    }
    authStore.setLoading(false);  
  }
}

const closeAlert = () => {
  errorMessage.value = ''
}
</script>

<style scoped>
/* Add any necessary styles here */
</style>