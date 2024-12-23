<template>
  <div class="p-4 max-w-md mx-auto">
    <h1 class="text-3xl font-bold mb-6">Sign Up</h1>
    <div v-if="errorMessage" class="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <span class="block font-bold sm:inline">{{ errorMessage }}</span>
      <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
        <svg @click="closeAlert" class="fill-current h-6 w-6 text-red-500 cursor-pointer" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 5.652a1 1 0 00-1.414 0L10 8.586 7.066 5.652a1 1 0 10-1.414 1.414L8.586 10l-2.934 2.934a1 1 0 101.414 1.414L10 11.414l2.934 2.934a1 1 0 001.414-1.414L11.414 10l2.934-2.934a1 1 0 000-1.414z"/></svg>
      </span>
    </div>
    <form @submit.prevent="signUpUser">
      <input v-model="email" type="email" placeholder="Email" class="border p-2 rounded w-full mb-4" required />
      <input v-model="password" type="password" placeholder="Password" class="border p-2 rounded w-full mb-4" required />
      <button type="submit" class="bg-indigo-500 text-white px-4 py-2 uppercase font-bold rounded hover:bg-indigo-600 w-full">Sign Up</button>
    </form>
    <p class="mt-4">Already have an account? <nuxt-link to="/signin" class="text-blue-500 hover:underline">Sign In</nuxt-link></p>
    <div v-if="verificationMessage" class="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
      <span class="block font-bold sm:inline">{{ verificationMessage }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../src/stores/auth'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { useNuxtApp } from '#app'
import type { Auth } from 'firebase/auth'
import { db } from '~/plugins/firebase' // Ensure correct import

// Store
const authStore = useAuthStore()

// Form data
const email = ref('')
const password = ref('')

// Error message
const errorMessage = ref('')

// Verification message
const verificationMessage = ref('')

// Router
const router = useRouter()

// Password validation function
const validatePassword = (password: string) => {
  const minLength = 8
  const hasUpperCase = /[A-Z]/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
  return password.length >= minLength && hasUpperCase && hasSpecialChar
}

// Sign-up function
const signUpUser = async () => {
  if (!validatePassword(password.value)) {
    errorMessage.value = 'Password must be at least 8 characters long and include an uppercase letter and a special character.'
    return
  }

  try {
    const nuxtApp = useNuxtApp()
    const $auth = nuxtApp.$auth as Auth
    const userCredential = await createUserWithEmailAndPassword($auth, email.value, password.value)
    const user = userCredential.user
    console.log('User signed up:', user)
    await setDoc(doc(db, 'users', user.uid), { 
      subscriptionLevel: 'free',
      paymentInfo: null,
      rsvp: null,
      tasks: null,
      polls: null,
      events: null
    }) // Set default subscription level to 'free' and initialize other fields
    await sendEmailVerification(user)
    verificationMessage.value = 'A verification email has been sent to your email address. Please verify your email before logging in.'
    setTimeout(() => {
      router.push('/verification')
    }, 3500)
  } catch (error) {
    console.error('Error signing up:', error)
    if (error.code === 'auth/email-already-in-use') {
      errorMessage.value = 'An account with this email already exists.'
    } else {
      errorMessage.value = 'An error occurred during sign-up. Please try again.'
    }
  }
}

// Close alert function
const closeAlert = () => {
  errorMessage.value = ''
}
</script>

<style scoped>
/* Add any necessary styles here */
</style>