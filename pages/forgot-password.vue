<template>
    <div class="p-4 max-w-md mx-auto">
      <h1 class="text-3xl font-bold mb-6">Forgot Password</h1>
      <div v-if="errorMessagePassword" class="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <span class="block font-bold sm:inline">{{ errorMessagePassword }}</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg @click="closeAlertPassword" class="fill-current h-6 w-6 text-red-500 cursor-pointer" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 5.652a1 1 0 00-1.414 0L10 8.586 7.066 5.652a1 1 0 10-1.414 1.414L8.586 10l-2.934 2.934a1 1 0 101.414 1.414L10 11.414l2.934 2.934a1 1 0 001.414-1.414L11.414 10l2.934-2.934a1 1 0 000-1.414z"/></svg>
        </span>
      </div>
      <div v-if="verificationMessage" class="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
        <span class="block font-bold sm:inline">{{ verificationMessage }}</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg @click="closeVerification" class="fill-current h-6 w-6 text-green-500 cursor-pointer" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 5.652a1 1 0 00-1.414 0L10 8.586 7.066 5.652a1 1 0 10-1.414 1.414L8.586 10l-2.934 2.934a1 1 0 101.414 1.414L10 11.414l2.934 2.934a1 1 0 001.414-1.414L11.414 10l2.934-2.934a1 1 0 000-1.414z"/></svg>
        </span>
      </div>
      <div class="mt-4 flex items-center">
        <input v-model="resetPasswordEmail" type="email" placeholder="Enter your email" class="border p-2 rounded w-full mr-2" />
        <button @click="resetPassword" class="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">Send</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { sendPasswordResetEmail } from 'firebase/auth'
  import { auth } from '~/plugins/firebase'
  import { useAuthStore } from '~/src/stores/auth'
  
  const resetPasswordEmail = ref('')
  const errorMessagePassword = ref('')
  const verificationMessage = ref('')

  const authStore = useAuthStore()
  
  const resetPassword = async () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!resetPasswordEmail.value) {
      errorMessagePassword.value = 'Please enter your email address to reset your password.'
      return
    }
    if (!emailPattern.test(resetPasswordEmail.value)) {
      errorMessagePassword.value = 'Please enter a valid email address.'
      return
    }
    try {
      authStore.setLoading(true);  
      await sendPasswordResetEmail(auth, resetPasswordEmail.value)
      verificationMessage.value = `A link to reset your password has been sent to ${resetPasswordEmail.value}!`
      resetPasswordEmail.value = ''
    } catch (error) {
      console.error('Error sending password reset email:', error)
      errorMessagePassword.value = 'An error occurred while sending the password reset email. Please try again.'
    }
    authStore.setLoading(false);  
  }
  
  const closeAlertPassword = () => {
    errorMessagePassword.value = ''
  }
  const closeVerification = () => {
    verificationMessage.value = ''
  }
  </script>
  
  <style scoped>
  /* Add any necessary styles here */
  </style>